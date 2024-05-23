const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.team = require("./team.model")(mongoose);
db.matchDetails=require("./matchDetails.model")(mongoose);
db.playerDetails=require("./playerDetails.model")(mongoose);
db.user=require("./user.model")(mongoose);
module.exports = db;
