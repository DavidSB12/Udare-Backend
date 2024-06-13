const httpMocks = require("node-mocks-http");
const userRepository = require("../repositories/user-repository");
const {
  addUser,
  getUserById,
} = require("../controllers/user-controllers/userCrudControllers");

const {
    followUser
  } = require("../controllers/user-controllers/userFriendsControllers");

// Crear un mock de userRepository
jest.mock("../repositories/user-repository.js");

describe("User Controller", () => {
  let req, res;
  
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it("should add a new user and return 201 status", async () => {
    const newUser = {
      username: "testuser",
      password: "password123",
      email: "testuser@example.com",
      profile: {},
      uid: "uid123",
    };
    req.body = newUser;

    userRepository.addUser.mockResolvedValue(newUser);

    await addUser(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toMatchObject(newUser);
    expect(userRepository.addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "testuser",
        password: "password123",
        email: "testuser@example.com",
        uid: "uid123",
      })
    );
  });

  it('should follow a user successfully and return 200 status', async () => {
    const userId = 'userId1';
    const userToFollowId = 'userId2';

    const user = {
      _id: userId,
      username: 'testuser1',
      password: 'password123',
      email: 'testuser1@example.com',
      uid: 'uid123',
      profile: {
        followers: [],
        following: [],
      }
    };

    const userToFollow = {
      _id: userToFollowId,
      username: 'testuser2',
      password: 'password123',
      email: 'testuser2@example.com',
      uid: 'uid124',
      profile: {
        followers: [],
        following: [],
      }
    };

    req.params.id = userId;
    req.body._id = userToFollowId;

    userRepository.getUserById.mockResolvedValueOnce(user);
    userRepository.getUserById.mockResolvedValueOnce(userToFollow);

    await followUser(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: "User followed successfully." });
    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
    expect(userRepository.getUserById).toHaveBeenCalledWith(userToFollowId);
    expect(userRepository.updateUserById).toHaveBeenCalledWith(userId, expect.objectContaining({
      profile: expect.objectContaining({
        following: expect.arrayContaining([userToFollowId])
      })
    }));
    expect(userRepository.updateUserById).toHaveBeenCalledWith(userToFollowId, expect.objectContaining({
      profile: expect.objectContaining({
        followers: expect.arrayContaining([userId])
      })
    }));
  });
});
