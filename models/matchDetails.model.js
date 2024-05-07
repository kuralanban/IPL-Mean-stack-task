module.exports = mongoose => {
    const matchDetails = mongoose.model(
      "matchDetails",
      mongoose.Schema(
        {
          innings: {
            type: String
          },
          overs:{
            type:String
          },
          ballnumber:{
            type:String
          },
          batter:{
            type:String
          },
          bowler:{
            type:String
          },
          extra_type:{
            type:String
          },
          batsman_run:{
            type:String
          },
          extras_run:{
            type:String
          },
          total_run:{
            type:String
          },
          non_boundary:{
            type:String
          },
          isWicketDelivery:{
            type:String
          },
          player_out:{
            type:String
          },
          kind:{
            type:String
          },
          fielders_involved:{
            type:String
          },
          BattingTeam:{
            type:String
          },
        },
      )
    );
    return matchDetails;
  };