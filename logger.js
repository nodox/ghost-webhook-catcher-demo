
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const transports = [
  new winston.transports.Console(),
]

if (process.env.NODE_ENV === 'production') {
  // Imports the Google Cloud client library for Winston
  const loggingWinston = new LoggingWinston();

  transports.push(loggingWinston)
}

// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  level: 'info',
  transports: transports
});




module.exports = logger