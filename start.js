const mongoose = require('mongoose');
require('dotenv').config({
  path: 'variables.env'
});

/**
 * Connect to the database
 */
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Can't connect to the database ${err}`);
});

require('./models/Company');
require('./models/Event');

const app = require('./app');

app.set('port', process.env.PORT || 8888);

const server = app.listen(app.get('port'), () => {
  console.log(`🚀 App running on port ${server.address().port}`);
});