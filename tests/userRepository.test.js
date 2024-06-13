const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../model/User");
const Post = require("../model/Post");
const userRepository = require("../repositories/user-repository");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
});

describe("testing userRepository", () => {
  it("should add a user", async () => {
    const userData = {
      username: "testuser",
      password: "password123",
      uid: "uid123",
      email: "testuser@example.com",
    };
    const user = await userRepository.addUser(userData);

    expect(user).toHaveProperty("_id");
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.uid).toBe(userData.uid);
    expect(user.password).toBe(userData.password);
  });

  it("should get a user by ID", async () => {
    const userData = {
      username: "testuser",
      password: "password123",
      uid: "uid123",
      email: "testuser@example.com",
    };
    const user = new User(userData);
    await user.save();

    const foundUser = await userRepository.getUserById(user._id);

    expect(foundUser).toHaveProperty("_id");
    expect(foundUser.uid).toBe(userData.uid);
    expect(foundUser.username).toBe(userData.username);
    expect(foundUser.password).toBe(userData.password);
    expect(foundUser.email).toBe(userData.email);
  });

  it("should return followers of the user", async () => {
    const follower1 = new User({
      username: "follower1",
      password: "password123",
      uid: "uid1231",
      email: "follower1@example.com",
    });
    const follower2 = new User({
      username: "follower2",
      password: "password123",
      uid: "uid1232",
      email: "follower2@example.com",
    });
    await follower1.save();
    await follower2.save();

    const user = new User({
      username: "testuser",
      password: "password123",
      uid: "uid123",
      email: "testuser@example.com",
      profile: { followers: [follower1._id, follower2._id] },
    });
    await user.save();

    const followers = await userRepository.getFollowersOfUser(user._id);

    expect(followers).toHaveLength(2);
    expect(followers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ username: "follower1" }),
        expect.objectContaining({ username: "follower2" }),
      ])
    );
  });
  it("should return posts from the last day", async () => {
    const user = new User({
      username: "testuser",
      password: "password123",
      uid: "uid123",
      email: "testuser@example.com",
    });
    await user.save();

    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Crea 3 posts dentro de las últimas 24 horas
    const recentPost1 = new Post({
      userID: user._id,
      date: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      caption: "recent post 1",
    }); // 1 hour ago
    const recentPost2 = new Post({
      userID: user._id,
      date: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      caption: "recent post 2",
    }); // 2 hours ago
    const recentPost3 = new Post({
      userID: user._id,
      date: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      caption: "recent post 3",
    }); // 3 hours ago

    // Crea 2 posts fuera de las últimas 24 horas
    const oldPost1 = new Post({
      userID: user._id,
      date: new Date(now.getTime() - 26 * 60 * 60 * 1000),
      caption: "old post 1",
    }); // 26 hours ago
    const oldPost2 = new Post({
      userID: user._id,
      date: new Date(now.getTime() - 30 * 60 * 60 * 1000),
      caption: "old post 2",
    }); // 30 hours ago

    await recentPost1.save();
    await recentPost2.save();
    await recentPost3.save();
    await oldPost1.save();
    await oldPost2.save();

    const posts = await userRepository.getLastDayPostsOfUser(user, yesterday);

    expect(posts).toHaveLength(3);
    expect(posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ caption: "recent post 1" }),
        expect.objectContaining({ caption: "recent post 2" }),
        expect.objectContaining({ caption: "recent post 3" }),
      ])
    );
  });

  it("should return top 10 users sorted by total points", async () => {
    const usersData = [
      {
        username: "user1",
        password: "password123",
        uid: "uid1",
        email: "user1@example.com",
        profile: {
          pointsSport: 100,
          pointsSocial: 200,
          pointsCulture: 300,
          pointsGrowth: 400,
          pointsCooking: 500,
        },
      },
      {
        username: "user2",
        password: "password123",
        uid: "uid2",
        email: "user2@example.com",
        profile: {
          pointsSport: 150,
          pointsSocial: 250,
          pointsCulture: 350,
          pointsGrowth: 450,
          pointsCooking: 550,
        },
      },
      {
        username: "user3",
        password: "password123",
        uid: "uid3",
        email: "user3@example.com",
        profile: {
          pointsSport: 200,
          pointsSocial: 300,
          pointsCulture: 400,
          pointsGrowth: 500,
          pointsCooking: 600,
        },
      }
    ];
    
    await User.insertMany(usersData);

    const topUsers = await userRepository.getTopUsers();

    expect(topUsers).toHaveLength(3);
    expect(topUsers[0].username).toBe("user3");
    expect(topUsers[1].username).toBe("user2");
    expect(topUsers[2].username).toBe("user1");
  });
});


