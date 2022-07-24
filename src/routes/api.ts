import { Router } from "express";
import readFilesRouter from "./readFiles";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/", readFilesRouter);

// Export default.
export default baseRouter;
