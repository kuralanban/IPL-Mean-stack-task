const resultService=require("../service/result.service");

exports.processResult = async (req,res,next) =>{
   try{
    const userId = req.params.userId;
    const result = resultService.processResultService(userId);
    if(result){
      res.status(200).send({
        message: "Your fantasy Team Points are proccessed !",
        status:1
      });
    }
   } 
   catch(err){
      res.status(500).send({
         message: err.message || "Some error occurred while fetching users."
       });
   }
}