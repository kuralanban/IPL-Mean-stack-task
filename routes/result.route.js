const resultController = require ("../controllers/result.controller")

module.exports = (app)=>{
    
    var router = require("express").Router();
    
    router.post("/process-result/:userId",resultController.processResult);

    router.get("/team-result",resultController.viewTeamResult);

    app.use("/", router);
}