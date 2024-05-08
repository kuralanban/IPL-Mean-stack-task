const mongoose = require("mongoose");


module.exports = mongoose => {
    const playerDetails = mongoose.model(
      "playerDetails",
      mongoose.Schema(
        {
          Player: {
            type: String
          },
          Team:{
            type:String
          },
          Role:{
            type:String
          },
        },
      )
    );
    return playerDetails;
  };