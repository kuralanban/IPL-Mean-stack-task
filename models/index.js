const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.team = require("./team.model")(mongoose);

module.exports = db;
