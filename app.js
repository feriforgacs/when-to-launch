const express = require('express');
const errorHandlers = require('./handlers/errorHandlers');
const path = require('path');

const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const Company = mongoose.model('Company');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Display basic info on homepage
 */
app.get('/', (req, res) => {
  res.render('home');
});

/** 
 * API Endpoints
 */

/**
 * Return all events from the database
 */
app.get('/v1/all/', errorHandlers.catchErrors(async (req, res) => {
  const events = await Event.find().sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Return upcoming events from the database
 */
app.get('/v1/upcoming', errorHandlers.catchErrors(async (req, res) => {
  const events = await Event.find({
    $or: [
      { dateFrom: { $gte: Date.now() } },
      { dateTo: { $gte: Date.now() } }
    ]
  }).sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Return all events for today
 */
app.get('/v1/today', errorHandlers.catchErrors(async (req, res) => {
  const events = await Event.find({
    dateFrom: { $lte: Date.now() },
    dateTo: { $gte: Date.now() }
  }).sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Return all events for today
 */
app.get('/v1/date/:date', errorHandlers.catchErrors(async (req, res) => {
  const date = new Date(req.params.date).toISOString();
  console.log(date);
  const events = await Event.find({
    dateFrom: { $lte: date },
    dateTo: { $gte: date },
  }).sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Error handling
 */
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);

if(app.get('env') === 'development'){
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;