const teamService=require("");

exports.addNewTeam = async (req,res,next) =>{
   try{
    const data = req.data;
    const addedTeam = teamService.addNewTeamService();
   } 
   catch(err){

   }
}