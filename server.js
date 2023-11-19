// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const mongoose = require('mongoose');
const logRoutes = require('./routes/logs');
const dbConfig = require('../config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/logs', logRoutes);

// PostgreSQL Connection
const postgresClient = new Client({
  user: dbConfig.postgres.user,
  password: dbConfig.postgres.password,
  database: dbConfig.postgres.database,
  host: dbConfig.postgres.host,
  port: dbConfig.postgres.port,
});

postgresClient.connect()
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((err) => {
    console.error('PostgreSQL connection error:', err);
  });

// MongoDB Connection
console.log(dbConfig.mongo.url);
const mongoURI = dbConfig.mongo.url;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error connecting to database ${error}`);
});
db.once('open', async  () => {
  console.log(`Connected to Database`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

