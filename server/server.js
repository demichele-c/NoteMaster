// Importing the express framework to create a server
const express = require('express');

// Initializing the express app
const app = express();

// Setting the port to listen on. It will first check for an environment variable (useful for production).
// If no environment variable is found, it defaults to port 3000.
const PORT = process.env.PORT || 3000;

// Serving static files from the 'dist' directory located inside the 'client' folder
app.use(express.static('./client/dist'));

// Middleware to parse incoming requests with URL-encoded payloads (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming requests with JSON payloads (API requests)
app.use(express.json());

// Importing and using the route handlers for serving HTML (defined in 'htmlRoutes.js')
require('./routes/htmlRoutes')(app);

// Starting the server and listening on the specified port.
// When the server is up and running, it logs the message with the port number.
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
