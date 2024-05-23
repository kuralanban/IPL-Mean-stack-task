const resultController = require ("../controllers/result.controller")

module.exports = (app)=>{
    
    var router = require("express").Router();
    
    router.post("/process-result/:userId",resultController.processResult);

    app.use("/", router);
}