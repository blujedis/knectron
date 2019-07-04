const express = require('express');
const app = express();
const { join } = require('path');

app.get('/', function(req, res) {
    res.sendFile(join(__dirname + '/index.html'));
});

app.listen(3000, () => {
  console.log(`Listening on: http://127.0.0.1:3000`);
});

// Just suppresses errors for example
// when concurrently kills-others, otherwise
// you'll flood your term with ELIFECYCLE error.
process.on('SIGTERM', () => {
  process.exit();
});