import express from "express";
import JobRouter from "./job.route.js"

const appRouter = express.Router();

appRouter.use("/job", JobRouter);

export default appRouter;