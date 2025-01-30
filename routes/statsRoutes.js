// src/routes/statsRoutes.ts
import express from "express";
import { getApplicationStats } from "../controllers/statsController";

const router = express.Router();

// Define route for fetching stats
router.get("/", getApplicationStats);

export default router;
