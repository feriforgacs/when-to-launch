const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const data = {
    variable: 'value'
  }
  res.json(data);
});

module.exports = app;