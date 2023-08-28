const express = require('express');
const {dashboardController} = require('../../controllers');
const permission = require('../../middlewares/permission');

const router = express.Router();

router
  .route('/')
  //   .post(auth('manageProjects'), validate(projectValidation.createProject), projectController.createProject)
  //   .post(permission('manage_project'), projectController.createProject)
  //   .post(projectController.createProject)
  .get(dashboardController.getDashboardData);

module.exports = router;
