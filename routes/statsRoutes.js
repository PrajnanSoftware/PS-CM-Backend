// src/routes/statsRoutes.ts
const express = require('express');
const { getApplicationStats } = require('../controllers/statsController');

const router = express.Router();

// Define route for fetching stats
router.get("/stats", getApplicationStats);

module.exports = router;
