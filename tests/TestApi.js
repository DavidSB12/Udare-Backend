const supertest = require('supertest');
const { expect } = require('chai');
const { app, startServer } = require('../index.js'); // Ajusta la ruta según la estructura de tu proyecto

describe('User API Tests', () => {
  let server;

  before(() => {
    server = startServer(3001); // Puedes ajustar el puerto según tus necesidades
  });

  after(() => {
    server.close();
  });

  it('should get all users', async () => {
    const response = await supertest(app)
      .get('/users')
      .expect(200);

    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should get a user by ID', async () => {
    // Supongamos que ya tienes un ID válido para un usuario existente
    const userId = '652436d13df7259a08be9f6f'; // Reemplaza con un ID real
    const response = await supertest(app)
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).to.be.an('object');
    expect(response.body._id).to.equal(userId);
       
    const nonExistentUserId = '652436d13df7259a08be9f6t'; // Reemplaza con un ID que no exista
    await supertest(app)
      .get(`/users/${nonExistentUserId}`)
      .expect(500);

      
  });
  


});
