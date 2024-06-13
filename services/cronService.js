const cron = require("node-cron");
const User = require("../model/User"); // Ajusta la ruta según sea necesario
const userRepository = require("../repositories/user-repository.js");

const configureCronJobs = () => {
  // Configura el cron job para que se ejecute a medianoche todos los días
  cron.schedule("0 0 * * *", async () => {
    try {
      await userRepository.updateDailyChallenge();
      console.log(`Successfully reset dailyChallengeCompleted for users.`);
    } catch (error) {
      console.error("Error resetting dailyChallengeCompleted:", error);
    }
  });

  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const users = await userRepository.getAllUsers();

      for (const user of users) {
        let posts = userRepository.getLastDayPostsOfUser(user, yesterday);

        if(posts.length === 0) {
          user.profile.currentStreak = 0;
          await userRepository.updateUserById(user._id,user);
        }
      }
    } catch (error) {
      console.error("Error checking all users streaks:", error);
    }
  });
};

module.exports = { configureCronJobs };
