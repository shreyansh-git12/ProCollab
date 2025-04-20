import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { body } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authUser,
  body("name").isString().withMessage("Name is required"),
  projectController.createProjectController
);

router.get("/all", authUser, projectController.getAllProjectsController);

router.put(
  "/add-user",
  authUser,
  [
    body("projectId").isString().withMessage("projectId must be a string"),

    body("users")
      .isArray({ min: 1 })
      .withMessage("users must be a non-empty array"),

    body("users.*")
      .isString()
      .withMessage("Each item in users must be a string"),
  ],
  projectController.addUserToProjectController
);

router.get(
  "/get-project/:projectId",
  authUser,
  projectController.getProjectByIdController
);

export default router;
