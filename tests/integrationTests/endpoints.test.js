const request = require('supertest');
const { app, startServer } = require('../../index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Post = require('../../model/Post');
const User = require('../../model/User');

let mongoServer;

beforeAll(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
});

describe('Post API Integration Tests', () => {
  it('should get the posts of user friends', async () => {

    const user = new User({ username: 'testuser', password: 'password123', email: 'testuser@example.com', uid: 'uid123' });
    const friend1 = new User({ username: 'frienduser1', password: 'password1234', email: 'frienduser1@example.com', uid: 'uid1245' });
    const friend2 = new User({ username: 'frienduser2', password: 'password1235', email: 'frienduser2@example.com', uid: 'uid1246' });
    const friend3 = new User({ username: 'frienduser3', password: 'password1236', email: 'frienduser3@example.com', uid: 'uid1247' });
    user.profile.following.push(friend1._id);
    user.profile.following.push(friend2._id);
    user.profile.following.push(friend3._id);
    await user.save();
    await friend1.save();
    await friend2.save();
    await friend3.save();


    const friend1Post = new Post({ caption: 'friend post 1', userID: friend1._id, date: new Date() });
    const friend2Post = new Post({ caption: 'friend post 2', userID: friend2._id, date: new Date() });
    const friend3Post = new Post({ caption: 'friend post 3', userID: friend3._id, date: new Date() });
    await friend1Post.save();
    await friend2Post.save();
    await friend3Post.save();

    const response = await request(app)
      .get(`/posts/getFriendsPosts/${user._id}`)
      .expect(200)
      .expect('Content-Type', /json/);
      

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
    expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ caption: 'friend post 1', userID: friend1._id.toString() }),
          expect.objectContaining({ caption: 'friend post 2', userID: friend2._id.toString() }),
          expect.objectContaining({ caption: 'friend post 3', userID: friend3._id.toString() }),
        ])
      );
  });
});
