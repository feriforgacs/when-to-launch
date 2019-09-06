const express = require('express');
const errorHandlers = require('./handlers/errorHandlers');
const path = require('path');

const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const Company = mongoose.model('Company');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

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
 * Return all events for a selected date
 * date format: YYYY-MM-DD
 */
app.get('/v1/date/:date', errorHandlers.catchErrors(async (req, res) => {
  const date = new Date(req.params.date).toISOString();
  const events = await Event.find({
    dateFrom: { $lte: date },
    dateTo: { $gte: date },
  }).sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Return all companies from the database
 */
app.get('/v1/companies', errorHandlers.catchErrors(async (req, res) => {
  const companies = await Company.find().sort({
    name: 1
  });
  res.json(companies);
}));

/**
 * Return all events for a selected company
 */
app.get('/v1/events/company/:companyId', errorHandlers.catchErrors(async (req, res) => {
  const events = await Event.find({
    company: req.params.companyId
  }).sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Return all upcoming events for a selected company
 */
app.get('/v1/events/company/:companyId/upcoming', errorHandlers.catchErrors(async (req, res) => {
  const events = await Event.find({
    company: req.params.companyId,
    dateTo: {
      $gte: Date.now()
    }
  }).sort({
    dateFrom: 1
  });
  res.json(events);
}));

/**
 * Return all data for a selected event
 */
app.get('/v1/event/:eventId', errorHandlers.catchErrors(async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.eventId
  });
  res.json(event);
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