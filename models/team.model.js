const mongoose = require("mongoose");

module.exports = (mongoose) => {
  const teamSchema = new mongoose.Schema(
    {
      user: {
        type: String,
      },
      teamName: {
        type: String,
      },
      players: {
        type: [
          {
            id: {
              type: String,
            },
            points: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
      captain: {
        type: String,
      },
      viceCaptain: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const Team = mongoose.model("Team", teamSchema);
  return Team;
};
