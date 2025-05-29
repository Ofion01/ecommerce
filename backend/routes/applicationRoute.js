import express from "express";
import {
  addApplication,
  getlistApplication,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.post("/add", addApplication);
applicationRouter.get("/", getlistApplication);
applicationRouter.put("/:id/status", updateApplicationStatus);

export default applicationRouter;
