import { createHash, createHmac, randomBytes, randomInt } from 'node:crypto';

const TTL = 600;
const hash = (value) => createHash('sha256').update(value).digest('hex');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Dependencies are injectable so the email flow can be tested without sending mail.
export function createContactHandler({ env = process.env, request = fetch } = {}) {
  async function redis(command) {
    const response = await request(env.UPSTASH_REDIS_REST_URL, {
      method: 'POST', headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command), signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Storage unavailable');
    const data = await response.json();
    if (data.error) throw new Error('Storage command failed');
    return data.result;
  }

  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Método no permitido.' });
    }
    const required = ['CONTACT_ORIGIN', 'CONTACT_CODE_SECRET', 'RESEND_API_KEY', 'CONTACT_FROM', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'];
    if (required.some((key) => !env[key]) || env.CONTACT_CODE_SECRET.length < 32) {
      return res.status(503).json({ error: 'La confirmación por correo aún no está configurada. Puedes contactarnos por WhatsApp.' });
    }
    if (req.headers.origin !== env.CONTACT_ORIGIN) return res.status(403).json({ error: 'Origen no permitido.' });
    let body;
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
    catch { return res.status(400).json({ error: 'Solicitud no válida.' }); }
    if (!body || JSON.stringify(body).length > 12000) return res.status(400).json({ error: 'Solicitud demasiado grande o incompleta.' });
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ error: 'Escribe un correo electrónico válido.' });
    if (body.website) return res.status(400).json({ error: 'No se pudo procesar la solicitud.' });
    const codeHash = (id, code) => createHmac('sha256', env.CONTACT_CODE_SECRET).update(`${id}:${email}:${code}`).digest('hex');
    try {
      if (body.action === 'challenge') {
        // Atomic shared limits survive serverless cold starts and multiple instances.
        const limitScript = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n";
        const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
        const ipCount = await redis(['EVAL', limitScript, '1', `contact:ip:${hash(ip)}`, String(TTL)]);
        const emailCount = await redis(['EVAL', limitScript, '1', `contact:email:${hash(email)}`, String(TTL)]);
        if (ipCount > 10 || emailCount > 3) return res.status(429).json({ error: 'Has solicitado varios códigos. Espera diez minutos antes de intentarlo de nuevo.' });
        const id = randomBytes(24).toString('hex');
        const code = String(randomInt(0, 1000000)).padStart(6, '0');
        await redis(['HSET', `contact:challenge:${id}`, 'email', email, 'hash', codeHash(id, code), 'attempts', '0']);
        await redis(['EXPIRE', `contact:challenge:${id}`, String(TTL)]);
        const result = await request('https://api.resend.com/emails', {
          method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact-${id}` },
          body: JSON.stringify({ from: env.CONTACT_FROM, to: [email], subject: 'Confirma tu correo · Jenny Moscol', text: `Tu código de confirmación es ${code}. Caduca en 10 minutos. Introduce el código en la página de contacto para enviar tu consulta. Si no lo solicitaste, ignora este mensaje.` }),
          signal: AbortSignal.timeout(15000),
        });
        if (!result.ok) { await redis(['DEL', `contact:challenge:${id}`]); throw new Error('Email unavailable'); }
        return res.status(200).json({ challengeId: id, expiresIn: TTL });
      }
      if (body.action !== 'submit') return res.status(400).json({ error: 'Acción no válida.' });
      const name = typeof body.nombre === 'string' ? body.nombre.trim() : '';
      const message = typeof body.mensaje === 'string' ? body.mensaje.trim() : '';
      if (name.length < 2 || name.length > 120 || message.length < 10 || message.length > 5000 || body.politica !== true) return res.status(400).json({ error: 'Completa tu nombre, una consulta de entre 10 y 5000 caracteres y acepta la política de privacidad.' });
      if (!/^[a-f0-9]{48}$/.test(body.challengeId || '') || !/^\d{6}$/.test(body.code || '')) return res.status(400).json({ error: 'Solicita e introduce el código de seis dígitos.' });
      // Consume once, atomically. Wrong codes have at most five attempts.
      const verifyScript = "if redis.call('EXISTS',KEYS[1])==0 then return 0 end; local n=redis.call('HINCRBY',KEYS[1],'attempts',1); if n>5 then redis.call('DEL',KEYS[1]); return 0 end; if redis.call('HGET',KEYS[1],'email')~=ARGV[1] or redis.call('HGET',KEYS[1],'hash')~=ARGV[2] then return 0 end; redis.call('DEL',KEYS[1]); return 1";
      const verified = await redis(['EVAL', verifyScript, '1', `contact:challenge:${body.challengeId}`, email, codeHash(body.challengeId, body.code)]);
      if (verified !== 1) return res.status(400).json({ error: 'Código incorrecto, caducado o ya utilizado. Solicita uno nuevo si es necesario.' });
      const result = await request(`https://formspree.io/f/${env.FORMSPREE_FORM_ID || 'xwlelqbz'}`, {
        method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, email, mensaje: message, politica: 'Aceptada', correo_confirmado: true }), signal: AbortSignal.timeout(15000),
      });
      if (!result.ok) return res.status(502).json({ error: 'El correo se confirmó, pero no se pudo entregar la consulta. Tus datos siguen en el formulario; solicita otro código para reintentar.', resetChallenge: true });
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(502).json({ error: 'El servicio no está disponible temporalmente. Inténtalo de nuevo o escríbenos por WhatsApp.', resetChallenge: true });
    }
  };
}

export default createContactHandler();
