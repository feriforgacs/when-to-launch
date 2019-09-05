require('dotenv').config({
  path: 'variables.env'
});

const app = require('./app');

app.set('port', process.env.PORT || 8888);

const server = app.listen(app.get('port'), () => {
  console.log(`🚀 App running on port ${server.address().port}`);
});