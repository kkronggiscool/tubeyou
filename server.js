// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 39929;  // Changed port number to 39929 (valid range)

// Set views folder to 'ejs'
app.set('views', path.join(__dirname, 'ejs'));  // Changed 'views' to 'ejs'
app.set('view engine', 'ejs');  // Use EJS as the templating engine

// Static files setup (public folder for CSS and other assets)
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const routes = require('./routes/routes');
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
