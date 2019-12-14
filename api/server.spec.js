const server = require('./server.js');
const request = require('supertest');

describe('testing environment', () => {
  test('sanity check', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('POST: /register', () => {
  it('should return 200', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: "username", password: "password" })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
  });
  
  it('should return 401', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: "username", password: "password" })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(401);
  });
});