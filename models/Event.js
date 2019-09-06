const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Event title is required',
    trim: true,
    maxlength: 250
  },
  description: {
    type: String,
    trum: true,
    maxlength: 1000
  },
  url: {
    type: String,
    trim: true,
    maxlength: 300
  },
  dateFrom: Date,
  dateTo: Date
});

eventSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Event', eventSchema);