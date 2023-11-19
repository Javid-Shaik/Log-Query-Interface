// src/models/postgresLogModel.js - PostgreSQL Schema Example
const { Pool } = require('pg');
const dbConfig = require('../../config/db');

const postgresPool = new Pool({
  user: dbConfig.postgres.user,
  password: dbConfig.postgres.password,
  database: dbConfig.postgres.database,
  host: dbConfig.postgres.host,
  port: dbConfig.postgres.port,
  max: 20, // Adjust the maximum number of clients in the pool as needed
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function insertPostgresLog(logData) {
  const query = {
    text: 'INSERT INTO logs(level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    values: [
      logData.level,
      logData.message,
      logData.resourceId || null, // Handle empty resourceId
      logData.timestamp,
      logData.traceId || null, // Handle empty traceId
      logData.spanId || null, // Handle empty spanId
      logData.commit,
      logData.metadata ? logData.metadata.parentResourceId || null : null,
    ],
  };
  

  try {
    const result = await postgresPool.query(query);
    console.log('Log inserted into PostgreSQL');
  } catch (error) {
    console.error('Error inserting log into PostgreSQL:', error);
    throw error;
  }
}

module.exports = {
  insertPostgresLog,
};
