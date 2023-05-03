const request = require('supertest');
const app = require('../index.js');
// const db = require('../db');

describe('POST /register', () => {
  beforeAll(async () => {
    // Connect to the test database before running any tests
     myapp=await app.makeapp(process.env.MONGO_URL_TEST);
  });

  afterAll(async () => {
    // Disconnect from the test database after all tests are finished
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clear the test database before each test
    await db.clear();
  });

  it('should register a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };
    const response = await request(app)
      .post('/register')
      .send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });
  });
});
