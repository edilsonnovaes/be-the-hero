const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new INCIDENT', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', '8cea5024')
      .send({
        title: "Caso 999",
	      description: "Descrição caso 9999", 
	      value: "99999"
      });

      expect(response.body).toHaveProperty('id');

  });
});