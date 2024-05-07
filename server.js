// Packages 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv=require("dotenv");

const port = process.env.PORT;

// Enable CORS for all origins
app.use(cors({
    origin: '*',
    credentials: true,
  }));

// Using body parser to access json data 
app.use(bodyParser.json());

// config !
require('./config/db.config')