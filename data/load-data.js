require('dotenv').config({
  path: __dirname + '/../variables.env'
});

const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const Event = require('../models/Event');
const Company = require('../models/Company');

const companies = JSON.parse(fs.readFileSync(__dirname + '/companies.json', 'utf-8'));
const events = JSON.parse(fs.readFileSync(__dirname + '/events.json', 'utf-8'));

async function loadCompanies(){
  try {
    await Company.insertMany(companies);
    console.log("Companies added!");
    process.exit();
  } catch(e) {
    console.log("Error :(");
    console.log(e);
    process.exit();
  }
}

async function loadEvents(){
  try {
    await Event.insertMany(events);
    console.log("Events added!");
    process.exit();
  } catch(e) {
    console.log("Error :(");
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--companies')) {
  loadCompanies();
} else {
  loadEvents();
}