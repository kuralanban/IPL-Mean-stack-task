const mongoose = require("mongoose");

module.exports = mongoose => {
  const teamSchema = new mongoose.Schema(
    {
      teamName: {
        type: String
      },
      players: {
        type: [
          {
            id: {
              type: String
            },
            role: {
              type: String,
              required: true
            }
          }
        ],
      },
      captain: {
        type: String
      },
      viceCaptain: {
        type: String
      },
    },
    { timestamps: true }
  );

  
  const Team = mongoose.model('Team', teamSchema);
  return Team;
};
