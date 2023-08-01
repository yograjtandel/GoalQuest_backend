const express = require('express');
const {timelogController} = require('../../controllers');
// const permission = require('../../middlewares/permission');

const router = express.Router();

router
  .route('/')
  //   .post(auth('manageProjects'), validate(projectValidation.createProject), timelogController.createProject)
  //   .post(permission('manage_project'), timelogController.createProject)
  .post(timelogController.createTimelog)
  .get(timelogController.getTimelogs);

router
  .route('/:timelogId')
  .get(timelogController.getTimelog)
  .patch(timelogController.updateTimelog)
  .delete(timelogController.deleteTimelog);

module.exports = router;
