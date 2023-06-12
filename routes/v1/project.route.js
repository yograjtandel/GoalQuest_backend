const express = require("express");
const projectController = require("../../controllers/project.controller");
const permission = require("../../middlewares/permission");

const router = express.Router();

router
  .route("/")
  //   .post(auth('manageProjects'), validate(projectValidation.createProject), projectController.createProject)
  .post(permission("manage_project"), projectController.createProject)
  .get(projectController.getProjects);

router
  .route("/:projectId")
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
