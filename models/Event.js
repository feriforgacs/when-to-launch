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
  dateTo: Date,
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  }
});

function autoPopulate(next){
  this.populate('company');
  next();
}

eventSchema.pre('find', autoPopulate);
eventSchema.pre('findOne', autoPopulate);

eventSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Event', eventSchema);