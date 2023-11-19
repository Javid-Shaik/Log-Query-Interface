// src/controllers/logController.js
const { insertPostgresLog } = require('../models/postgresLogModel');
const { insertMongoLog } = require('../models/mongoLogModel');

const logQueue = [];

async function processLogQueue() {
  while (logQueue.length > 0) {
    const logData = logQueue.shift();
    try {
      await insertPostgresLog(logData);
      await insertMongoLog(logData);
    } catch (error) {
      console.error('Error processing log:', error);
    }
  }
}

setInterval(processLogQueue, 1000); // Process the log queue every second

async function ingestLog(req, res) {
  const logData = req.body;
  logQueue.push(logData); // Queue log data for asynchronous processing
  res.status(200).json({ message: 'Log ingested successfully' });
}

module.exports = {
  ingestLog,
};
