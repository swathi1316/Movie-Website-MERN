// helpers.js
import request from 'supertest';
import app from '../server.js';

async function loginUser(credentials) {
  const res = await request(app)
    .post('/login')
    .send(credentials);

  if (res.statusCode !== 200 || !res.body.token) {
    throw new Error('Login failed');
  }
  return res.body.token;
}

export { loginUser };
