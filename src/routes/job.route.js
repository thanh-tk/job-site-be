import express from "express";
import JobController from "../controllers/job.controller.js"

const JobRouter = express.Router();

// Route to get a job by ID
JobRouter.get("/jobs", JobController.getJobList);

// Route to create a new job
JobRouter.post("/new", JobController.createJob);

// Route to get a job by ID
JobRouter.get("/:id", JobController.getJob);

// Route to update a job by ID
JobRouter.put("/:id/edit", JobController.updateJob);

// Route to delete a job by ID
JobRouter.delete("/:id", JobController.deleteJob);

export default JobRouter;
