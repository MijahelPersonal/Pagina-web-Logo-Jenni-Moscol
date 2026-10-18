import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler } from '../api/contacto.js';

function fixture(overrides = {}, failures = {}) {
  const env = {
    CONTACT_ORIGIN: 'https://example.test', CONTACT_CODE_SECRET: 'test-secret-with-at-least-32-characters',
    RESEND_API_KEY: 'fake-key', CONTACT_FROM: 'Practice <practice@example.test>',
    UPSTASH_REDIS_REST_URL: 'https://redis.example.test', UPSTASH_REDIS_REST_TOKEN: 'fake-token',
    FORMSPREE_FORM_ID: 'test-form', ...overrides,
  };
  const counters = new Map(), challenges = new Map(), mails = [], forwards = [];
  const response = (result, ok = true) => ({ ok, json: async () => ({ result }) });
  const request = async (url, options) => {
    const body = JSON.parse(options.body);
    if (url === env.UPSTASH_REDIS_REST_URL) {
      if (failures.redis) return response(null, false);
      const [command, ...args] = body;
      if (command === 'HSET') {
        const fields = {};
        for (let i = 1; i < args.length; i += 2) fields[args[i]] = args[i + 1];
        challenges.set(args[0], fields);
        return response(3);
      }
      if (command === 'EXPIRE') return response(1);
      if (command === 'DEL') return response(Number(challenges.delete(args[0])));
      if (command === 'EVAL') {
        const [script, keyCount, key, ...values] = args;
        assert.equal(keyCount, '1');
        if (script.includes("redis.call('INCR'")) {
          const count = (counters.get(key) || 0) + 1;
          counters.set(key, count);
          return response(count);
        }
        assert.ok(script.includes("redis.call('HINCRBY'"), 'Unexpected Redis script');
        const saved = challenges.get(key);
        if (!saved) return response(0);
        saved.attempts = Number(saved.attempts) + 1;
        if (saved.attempts > 5) { challenges.delete(key); return response(0); }
        if (saved.email !== values[0] || saved.hash !== values[1]) return response(0);
        challenges.delete(key);
        return response(1);
      }
      assert.fail(`Unexpected Redis command ${command}`);
    }
    if (url === 'https://api.resend.com/emails') {
      mails.push(body);
      return response(null, !failures.resend);
    }
    assert.equal(url, 'https://formspree.io/f/test-form');
    forwards.push(body);
    return response(null, !failures.formspree);
  };
  const handler = createContactHandler({ env, request });
  async function call(body, headers = {}) {
    const result = { headers: {}, statusCode: 200 };
    const res = {
      setHeader(key, value) { result.headers[key] = value; },
      status(status) { result.statusCode = status; return this; },
      json(value) { result.body = value; return result; },
    };
    return handler({ method: 'POST', headers: { origin: env.CONTACT_ORIGIN, 'x-vercel-forwarded-for': '192.0.2.1', ...headers }, body }, res);
  }
  const challenge = async (email = 'person@example.test', headers) => {
    const result = await call({ action: 'challenge', email }, headers);
    const code = mails.at(-1)?.text.match(/\b\d{6}\b/)?.[0];
    return { result, code, challengeId: result.body.challengeId, email };
  };
  const submit = (challenge, extra = {}) => call({ action: 'submit', nombre: 'Test Person', mensaje: 'This is a test consultation.', politica: true, email: challenge.email, challengeId: challenge.challengeId, code: challenge.code, ...extra });
  return { call, challenge, submit, challenges, mails, forwards };
}

test('invented address without access to its code cannot forward a consultation', async () => {
  const f = fixture();
  const result = await f.call({ action: 'submit', email: 'invented@example.test', nombre: 'Test Person', mensaje: 'Consultation with no verified mailbox.', politica: true });
  assert.equal(result.statusCode, 400);
  assert.equal(f.mails.length, 0);
  assert.equal(f.forwards.length, 0);
});

test('five wrong attempts exhaust a challenge, including a subsequent correct code', async () => {
  const f = fixture(), challenge = await f.challenge();
  const wrong = challenge.code === '000000' ? '999999' : '000000';
  for (let i = 0; i < 5; i++) assert.equal((await f.submit(challenge, { code: wrong })).statusCode, 400);
  assert.equal((await f.submit(challenge)).statusCode, 400);
  assert.equal(f.challenges.size, 0);
  assert.equal(f.forwards.length, 0);
});

test('verified consultation forwards exactly once and rejects replay', async () => {
  const f = fixture(), challenge = await f.challenge();
  assert.equal(challenge.result.statusCode, 200);
  assert.equal((await f.submit(challenge)).statusCode, 200);
  assert.equal((await f.submit(challenge)).statusCode, 400);
  assert.equal(f.forwards.length, 1);
  assert.equal(f.forwards[0].correo_confirmado, true);
  assert.equal(f.forwards[0].email, challenge.email);
});

test('correct code is still accepted on the fifth attempt', async () => {
  const f = fixture(), challenge = await f.challenge();
  const wrong = challenge.code === '000000' ? '999999' : '000000';
  for (let i = 0; i < 4; i++) assert.equal((await f.submit(challenge, { code: wrong })).statusCode, 400);
  assert.equal((await f.submit(challenge)).statusCode, 200);
  assert.equal(f.forwards.length, 1);
});

test('code is bound to the address that requested it', async () => {
  const f = fixture(), challenge = await f.challenge();
  assert.equal((await f.submit(challenge, { email: 'changed@example.test' })).statusCode, 400);
  assert.equal(f.forwards.length, 0);
  assert.equal((await f.submit(challenge)).statusCode, 200);
});

test('foreign and missing origin fail before sending mail', async () => {
  const f = fixture();
  for (const origin of ['https://foreign.example.test', undefined]) {
    assert.equal((await f.call({ action: 'challenge', email: 'person@example.test' }, { origin })).statusCode, 403);
  }
  assert.equal(f.mails.length, 0);
});

test('missing service configuration and short signing secret fail closed', async () => {
  for (const key of ['CONTACT_ORIGIN', 'CONTACT_CODE_SECRET', 'RESEND_API_KEY', 'CONTACT_FROM', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']) {
    const f = fixture({ [key]: '' });
    assert.equal((await f.challenge()).result.statusCode, 503);
    assert.equal(f.mails.length, 0);
    assert.equal(f.forwards.length, 0);
  }
  assert.equal((await fixture({ CONTACT_CODE_SECRET: 'short' }).challenge()).result.statusCode, 503);
});

test('mail delivery failure removes the outstanding challenge', async () => {
  const f = fixture({}, { resend: true });
  assert.equal((await f.challenge()).result.statusCode, 502);
  assert.equal(f.challenges.size, 0);
  assert.equal(f.forwards.length, 0);
});

test('storage failure prevents email and forwarding', async () => {
  const f = fixture({}, { redis: true });
  assert.equal((await f.challenge()).result.statusCode, 502);
  assert.equal(f.mails.length, 0);
  assert.equal(f.forwards.length, 0);
});

test('Formspree failure reports retry and does not permit code replay', async () => {
  const f = fixture({}, { formspree: true }), challenge = await f.challenge();
  const result = await f.submit(challenge);
  assert.equal(result.statusCode, 502);
  assert.equal(result.body.resetChallenge, true);
  assert.equal((await f.submit(challenge)).statusCode, 400);
  assert.equal(f.forwards.length, 1);
});

test('per-address challenge limit permits three requests', async () => {
  const f = fixture();
  for (let i = 0; i < 3; i++) assert.equal((await f.challenge()).result.statusCode, 200);
  assert.equal((await f.challenge()).result.statusCode, 429);
  assert.equal(f.mails.length, 3);
});

test('shared IP challenge limit permits ten requests across addresses', async () => {
  const f = fixture();
  for (let i = 0; i < 10; i++) assert.equal((await f.challenge(`person${i}@example.test`)).result.statusCode, 200);
  assert.equal((await f.challenge('last@example.test')).result.statusCode, 429);
  assert.equal(f.mails.length, 10);
});

test('legitimate usernames containing formerly suspicious words are accepted', async () => {
  const f = fixture();
  for (const username of ['test.person', 'admin.family', 'fake.surname']) {
    const challenge = await f.challenge(`${username}@example.test`);
    assert.equal(challenge.result.statusCode, 200);
    assert.equal((await f.submit(challenge)).statusCode, 200);
  }
  assert.equal(f.forwards.length, 3);
});
