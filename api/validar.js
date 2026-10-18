export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Correo requerido' });
  }

  const emailLimpio = email.toLowerCase().trim();
  const [usuario, dominio] = emailLimpio.split('@');

  // 1. ESTRUCTURA BÁSICA
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(emailLimpio)) {
    return res.status(200).json({ esValido: false });
  }

  // 2. PUNTOS CLAVE / LISTA NEGRA PARA DEVS O PRUEBAS
  // Si alguien intenta probar la web con palabras típicas de testeo, se bloquea al instante:
  const palabrasClavePruebas = [
    'test', 'prueba', 'asdf', 'qwerty', 'fakemail', 'correo', 'nadie', 
    'tupapa', 'admin', 'bot', 'spam', 'user', 'ejemplo', 'foo', 'bar'
  ];

  const esPruebaOdev = palabrasClavePruebas.some(palabra => usuario.includes(palabra));
  if (esPruebaOdev) {
    return res.status(200).json({ esValido: false });
  }

  // 3. BLOQUEO DE DOMINIOS TEMPORALES / DESECHABLES
  const dominiosTemporales = [
    'tempmail.com', 'mailinator.com', '10minutemail.com', 
    'guerrillamail.com', 'yopmail.com', 'temp-mail.org', 'dispostable.com'
  ];
  if (dominiosTemporales.includes(dominio)) {
    return res.status(200).json({ esValido: false });
  }

  // 4. PATRONES DE TECLADO O LETRAS AL AZAR (Anti-basura)
  // Detecta si el nombre de usuario es una combinación masiva de números o letras sin sentido común
  const esTecladoAzar = /^[a-z0-9]{12,}$/.test(usuario) && /\d{3,}/.test(usuario);
  if (esTecladoAzar) {
    return res.status(200).json({ esValido: false });
  }

  // Si pasa todas las reglas de oro, el correo se acepta para el formulario de tu tía
  return res.status(200).json({ esValido: true });
}