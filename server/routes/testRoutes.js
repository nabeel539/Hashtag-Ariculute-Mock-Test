import express from "express";
import {
  getTestSet,
  getTestSetQuestions,
  getTestSets,
} from "../controllers/testController.js";
import { userProtect } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Fetch questions for a specific test
router.get("/:testId/sets", userProtect, getTestSets);

// ✅ Fetch test set details
router.get("/:testId/sets/:setId", userProtect, getTestSet);

// ✅ Fetch questions for a specific test set
router.get("/:testId/sets/:setId/questions", userProtect, getTestSetQuestions);

export default router;
