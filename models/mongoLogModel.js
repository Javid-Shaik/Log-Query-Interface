// src/models/mongoLogModel.js - MongoDB Schema Example
const mongoose = require('mongoose');
const dbConfig = require('../../config/db');

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

const mongoClient = mongoose.createConnection(dbConfig.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });

const MongoLog = mongoClient.model('Log', logSchema);

async function insertMongoLog(logData) {
  try {
    const log = new MongoLog(logData);
    await log.save();
    console.log('Log inserted into MongoDB');
  } catch (error) {
    console.error('Error inserting log into MongoDB:', error);
    throw error;
  }
}

module.exports = {
  insertMongoLog,
};
