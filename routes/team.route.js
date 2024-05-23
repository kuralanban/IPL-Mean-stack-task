const teamController = require ("../controllers/team.controller")

module.exports = (app)=>{
    
    var router = require("express").Router();
    
    router.post("/add-team",teamController.addNewTeam);

    app.use("/", router);
}