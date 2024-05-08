// Packages 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv=require("dotenv");
const cors = require("cors");

const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors({
    origin: '*',
    credentials: true,
  }));

// Using body parser to access json data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config !
require('./config/db.config')

// Routes

const teamRoute=require('./routes/team.route')(app);

app.listen(port,()=>{
  console.log(`Server running in ${port}`);
})
module.exports = app;