const supertest = require('supertest');
const { expect } = require('chai');
const Post = require('../model/Post.js')
const { app, startServer } = require('../index.js'); // Ajusta la ruta según la estructura de tu proyecto

describe('User API Tests', () => {
  let server;
  let post;

  before(() => {
    server = startServer(3001); // Puedes ajustar el puerto según tus necesidades
  });

  after(async () => {
    server.close();
  });

  it('should get all posts', async () => {
    const response = await supertest(app)
      .get('/posts')
      .expect(200);

    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should get a post by ID', async () => {
    // Supongamos que ya tienes un ID válido para un usuario existente
    const postId = '655f662db00ab07c2e656e0d'; // Reemplaza con un ID real
    const response = await supertest(app)
      .get(`/posts/${postId}`)
      .expect(200);

    expect(response.body).to.be.an('object');
    expect(response.body._id).to.equal(postId);
       
    const nonExistentUserId = '65582038384cfa18a562e8cc'; // Reemplaza con un ID que no exista
    await supertest(app)
      .get(`/posts/${nonExistentUserId}`)
      .expect(404);

      
  });

  it('should get all comments for a post', async () => {
    const postId = '652c381f9959f933ae731cab'; // Reemplaza con un ID real
    const response = await supertest(app)
      .get(`/posts/${postId}`)
      .expect(200);

    expect(response.body.comments).to.be.an('array');
    expect(response.body.comments.length).to.be.greaterThan(0);
  });

  it('should delete a post by ID', async () => {
    const postId = '6560b7693aa3ffc06c2eae83'; // Reemplaza con un ID real
    post = await Post.findById(postId);

    const response1 = await supertest(app)
      .delete(`/posts/${postId}`)
      .expect(200);

    const response2 = await supertest(app)
      .get(`/posts/${postId}`)
      .expect(404);

    expect(response1.body).to.be.an('object');
    expect(response2.body.message).to.equal('Post not found.');
  });

  it('should add a comment to a post', async () => {
    // Asumiendo que tienes un post existente con un ID válido en tu base de datos
    const postId = '655f69cbb00ab07c2e656f5f';
    const userId = 'tu_id_de_usuario';
    const comment = 'Este es un nuevo comentario';

    // Realiza la solicitud para agregar el comentario
    const response = await supertest(app)
      .post(`/posts/${postId}/addComment`)
      .send({ userId, comment })
      .expect(200);

    // Verifica la respuesta
    expect(response.body).to.have.property('comments');
    expect(response.body.comments).to.be.an('array');
    expect(response.body.comments.length).to.be.greaterThan(0);
    expect(response.body.comments[0].userId).to.equal(userId);
    expect(response.body.comments[0].comment).to.equal(comment);
  });


});
