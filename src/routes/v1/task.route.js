const express = require('express');
// const auth = require('../../middlewares/auth');
const taskController = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managetasks'), validate(taskValidation.createtask), taskController.createtask)
  .post(taskController.createRole)
  .get(taskController.getRoles);

router
  .route('/:taskId')
  .get(taskController.getRole)
  .patch(taskController.updateRole)
  .delete(taskController.deleteRole);

module.exports = router;
