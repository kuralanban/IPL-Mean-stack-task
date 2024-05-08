const teamService=require("../service/team.service");

exports.addNewTeam = async (req,res,next) =>{
   try{
    const team = req.body;

    const addedTeam = teamService.addNewTeamService(team);
    if(addedTeam){
      res.status(200).send({
        message: "Your fantasy Team added sucessfully !",
      });
    }
   } 
   catch(err){
      res.status(500).send({
         message: err.message || "Some error occurred while fetching users."
       });
   }
}