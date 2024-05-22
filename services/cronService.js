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
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      // Obtiene todos los usuarios
      const users = await userRepository.getAllUsers();


      for (const user of users) {
        let posts = userRepository.getLastDayPostsOfUser(user);

        if(posts.length === 0) {
          user.profile.currentStreak = 0;
          await userRepository.updateUserById(user._id,user);
        }
      }
      console.log(`Successfully reset all streaks for users.`);
    } catch (error) {
      console.error("Error checking all users streaks:", error);
    }
  });
};

module.exports = { configureCronJobs };
