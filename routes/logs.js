// src/routes/logs.js
const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

// Endpoint for ingesting logs
router.post('/', logController.ingestLog);

// Add more endpoints for querying logs if needed
// Example: router.get('/search', logController.searchLogs);

module.exports = router;
