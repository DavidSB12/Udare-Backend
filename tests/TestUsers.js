const supertest = require('supertest');
const { expect } = require('chai');
const { app, startServer } = require('../index.js'); // Ajusta la ruta según la estructura de tu proyecto
const User = require("../model/User.js");


describe('User API Tests', () => {
  let server;
  let addedUserId;

  before(() => {
    server = startServer(3001); // Puedes ajustar el puerto según tus necesidades
  });

  after(async () => {
    if (addedUserId) {
      await User.findByIdAndDelete(addedUserId);
    }
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

  it('should add a new user', async () => {
    // Datos del nuevo usuario a agregar
    const newUser = {
      username: 'testuser4',
      password: 'testpassword4',
      email: 'testuser4@example.com',
      uid: 'testuid2',
      profile: {
        name: 'Test User',
        bio: 'A test user',
        profilePic: 'testpic.jpg'
      }
    };
  
    // Realiza la solicitud POST para agregar un nuevo usuario
    const response = await supertest(app)
      .post('/users/add')
      .send(newUser)
      .expect(201);
  
    // Verifica la respuesta y asegúrate de que contenga los datos esperados
    expect(response.body).to.be.an('object');
    expect(response.body.username).to.equal(newUser.username);
    expect(response.body.email).to.equal(newUser.email);
    expect(response.body.uid).to.equal(newUser.uid);
  
    // Puedes realizar más verificaciones según la lógica de tu aplicación
  
    // Realiza una solicitud GET para verificar que el usuario fue realmente agregado
    const addedUserResponse = await supertest(app)
      .get(`/users/${response.body._id}`)
      .expect(200);
  
    // Verifica que los datos del usuario agregado coincidan con los esperados
    expect(addedUserResponse.body).to.be.an('object');
    expect(addedUserResponse.body._id).to.equal(response.body._id);
    expect(addedUserResponse.body.username).to.equal(newUser.username);
    expect(addedUserResponse.body.email).to.equal(newUser.email);
    expect(addedUserResponse.body.uid).to.equal(newUser.uid);
  
    addedUserId = response.body._id;
  });


  it('should get followers of a user', async () => {
    
    const userIdWithFollowers = '652436d13df7259a08be9f6f'; 
    const user = await User.findById(userIdWithFollowers);
    const expectedFollowersCount = user.profile.followers.length

    const response = await supertest(app)
      .get(`/users/${userIdWithFollowers}/getFollowersOfUser`)
      .expect(200);

    // Verificar que la respuesta sea un array de seguidores
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(expectedFollowersCount);
    // Puedes realizar más verificaciones según la lógica de tu aplicación
  });
  


});
