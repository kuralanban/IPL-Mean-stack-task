module.exports = mongoose => {
    const role = mongoose.model(
      "team",
      mongoose.Schema(
        {
          teamName: {
            type: String
          },
          players:{
            type:Array
          },
          captain: {
            type: String
          },
          viceCaptain: {
            type: String
          },
        },
        { timestamps: true }
      )
    );
    return role;
  };