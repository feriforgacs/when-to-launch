const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Comany name is required',
    maxlength: 250
  },
  url: {
    type: String,
    trim: true,
    maxlength: 250
  }
});

companySchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Company', companySchema);