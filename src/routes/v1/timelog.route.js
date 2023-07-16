const express = require('express');
const {timelogController} = require('../../controllers');
// const permission = require('../../middlewares/permission');

const router = express.Router();

router
  .route('/')
  //   .post(auth('manageProjects'), validate(projectValidation.createProject), timelogController.createProject)
  //   .post(permission('manage_project'), timelogController.createProject)
  .post(timelogController.createProject)
  .get(timelogController.getProjects);

router
  .route('/:projectId')
  .get(timelogController.getProject)
  .patch(timelogController.updateProject)
  .delete(timelogController.deleteProject);

module.exports = router;
