import express from "express";
import {
  addApplication,
  getlistApplication,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import adminAuth from "../middleware/adminAuth.js";

const applicationRouter = express.Router();

applicationRouter.post("/add", adminAuth, addApplication);
applicationRouter.get("/", getlistApplication);
applicationRouter.put("/:id/status", adminAuth, updateApplicationStatus);

export default applicationRouter;
