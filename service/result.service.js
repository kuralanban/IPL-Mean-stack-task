const db = require("../models");
const Player = db.playerDetails;
const Match = db.matchDetails;
const Team = db.team;

module.exports = {
  processResultService: async (userID) => {
    try {
      const matches = await Match.find({});
      const team = await Team.findOne({ user: userID }).lean();

      if (!team) {
        throw new Error('Team not found for the given user.');
      }

      const playerIDs = team.players.map(player => player.id);
      const players = await Player.find({ _id: { $in: playerIDs } }).lean();

      const playerMap = players.reduce((map, player) => {
        map[player._id.toString()] = player;
        return map;
      }, {});

      let totalTeamPoints = 0;

      const bulkOperations = team.players.map(teamPlayer => {
        const player = playerMap[teamPlayer.id];
        // console.log("players :",player)
        if (!player) return null;

        let points = module.exports.calculatePointsForPlayer(player, matches);
        // Check if the player is the captain or vice-captain and adjust points
        if (team.captain === teamPlayer.id) {
          points *= 2; // Double points for the captain
        } else if (team.viceCaptain === teamPlayer.id) {
          points *= 1.5; // 1.5 times points for the vice-captain
        }
        totalTeamPoints += points;
        return {
          updateOne: {
            filter: { user: userID, "players.id": teamPlayer.id },
            update: { $set: { "players.$.points": points } }
          }
        };
      }).filter(operation => operation !== null); 

      if (bulkOperations.length > 0) {
        await Team.bulkWrite(bulkOperations);
      }
      await Team.updateOne(
        { user: userID },
        { $set: { teamPoints: totalTeamPoints } }
      );
      return {
        success: true,
        message: "Points calculated and updated successfully",
      };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Internal Server Error" };
    }
  },

  calculatePointsForPlayer: (player, matches) => {
    let points = 0;
    let isBatterOut = false;
    let firstBall = true; 

    for (const match of matches) {
      if (isBatterOut) break; 

      // Determine if the player is involved in this match
      const isPlayerBatting = match.batter === player.Player;
      const isPlayerBowling = match.bowler === player.Player;
      const isPlayerFielding = match.fielders_involved && match.fielders_involved.includes(player.Player);

      // Batting points calculation
      if (isPlayerBatting) {
        const runs = parseInt(match.batsman_run);
        points += runs;
        if (runs >= 4) points += 1; 
        if (runs >= 6) points += 2;
        if (runs >= 30) points += 4; 
        if (runs >= 50 && runs < 100) points += 8; 
        if (runs >= 100) points += 16; 

        // Deduct 2 points for a first ball duck
        if (firstBall && runs === 0 && match.isWicketDelivery === "1") {
          points -= 2;
        }

        // After the first ball, set firstBall to false
        firstBall = false;

        if (match.isWicketDelivery === "1" && match.batter === player.Player) {
          isBatterOut = true; // Stop further calculations for this batter
        }
      }

      // Bowling points calculation
      if (isPlayerBowling) {
        if (match.isWicketDelivery === "1" && match.player_out !== "Run out")
          points += 25; 
        if (match.isWicketDelivery === "1" && (match.kind === "LBW" || match.kind === "Bowled"))
          points += 8; 

      
        let wicketCount = 0;
        if (match.isWicketDelivery === "1") {
          wicketCount++;
        }
        if (wicketCount >= 3) points += 4; 
        if (wicketCount >= 4) points += 8; 
        if (wicketCount >= 5) points += 16; 

        if (match.overs === "0" && match.total_run === "0") points += 12;
      }

      // Fielding points calculation
      if (isPlayerFielding) {
        if (match.kind === "Catch") points += 8; 
        let catchCount = 0;
        if (match.kind === "Catch") {
          catchCount++;
        }
        if (catchCount >= 3) points += 4; 
        if (match.kind === "Stumping") points += 12;
        if (match.kind === "Run out") points += 6; 
      }
    }

    return points;
  },
  viewTeamResultService: async () => {
    try {
      const teams = await Team.aggregate([
        { $sort: { teamPoints: -1 } },
        // Group all teams and find the maximum teamPoints
        {
          $group: {
            _id: null,
            teams: { $push: "$$ROOT" },
            maxPoints: { $first: "$teamPoints" }
          }
        },
        // Unwind the teams array to process each team individually
        { $unwind: "$teams" },
        // Add the isWinner field based on maxPoints
        {
          $addFields: {
            "teams.isWinner": { $eq: ["$teams.teamPoints", "$maxPoints"] }
          }
        },
        // Replace root to remove the intermediate fields
        { $replaceRoot: { newRoot: "$teams" } },
        
        {
          $project: {
            _id: 1,
            user: 1,
            teamName: 1,
            players: 1,
            captain: 1,
            viceCaptain: 1,
            teamPoints: 1,
            isWinner: 1
          }
        }
      ]);

      if (teams.length === 0) {
        return {
          success: false,
          message: "No teams found",
        };
      }
      return {
        success: true,
        message: "Teams retrieved and sorted by points successfully",
        data: teams,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error: "Internal Server Error",
      };
    }
  },
};
