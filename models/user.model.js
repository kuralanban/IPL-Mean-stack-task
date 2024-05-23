const mongoose = require("mongoose");

module.exports = mongoose => {
    const playerDetails = mongoose.model(
      "userDetails",
      mongoose.Schema(
        {
          userName: {
            type: String
          },
          password:{
            type:String
          },
          team:{
            type:String
          },
        },
        { collection: 'userDetails' } 
      )
    );
    return playerDetails;
  };