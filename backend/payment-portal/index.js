const express = require('express');
const helmet = require('helmet'); // Helmet for security headers
const bodyParser = require('body-parser'); // Body parsing for handling requests
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http'); // To handle HTTP requests
const connectDB = require('./mdb'); // Database connection
const morgan = require('morgan');

const app = express();

// SSL Certificate and Private Key
const sslKey = fs.readFileSync(path.join(__dirname, 'keys', 'privatekey.pem'));
const sslCert = fs.readFileSync(path.join(__dirname, 'keys', 'certificate.pem'));

// HTTPS server options
const httpsOptions = {
  key: sslKey,
  cert: sslCert,
};



// Connect to the database
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(helmet()); // Adds security headers
app.use(bodyParser.json()); // Parses JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start HTTPS server on port 443
https.createServer(httpsOptions, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

// Start an HTTP server on port 80 to redirect to HTTPS
http.createServer((req, res) => {
  // Redirect all requests to HTTPS
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80, () => {
  console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});