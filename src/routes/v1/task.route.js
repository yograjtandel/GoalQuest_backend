const express = require('express');
// const auth = require('../../middlewares/auth');
const {taskController} = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managetasks'), validate(taskValidation.createtask), taskController.createtask)
  .post(taskController.createTask)
  .get(taskController.getTasks);

router.route('/taskinitialdata').get(taskController.getTaskinitialData);

router
  .route('/:taskId')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
