// src/routes/statsRoutes.ts
const express = require('express');
const { getApplicationStats } = require('../controllers/authController');

const router = express.Router();

// Define route for fetching stats
router.get("/", getApplicationStats);

module.exports = router;
