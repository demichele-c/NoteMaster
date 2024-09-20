// Importing the 'path' module from Node.js, which provides utilities for working with file and directory paths
const path = require('path');

// Exporting a function that takes in an express app as an argument
// This defines a route for serving the main HTML page of the app
module.exports = (app) =>
  // Handling GET requests to the root ('/') of the server.
  app.get('/', (req, res) =>
    // Responding to the request by sending the 'index.html' file located in the 'client/dist' directory
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
