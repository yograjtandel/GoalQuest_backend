const express = require('express');
// const auth = require('../../middlewares/auth');
const {rightController} = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managerights'), validate(rightValidation.createright), rightController.createright)
  .post(rightController.createRole)
  .get(rightController.getRoles);

router
  .route('/:rightId')
  .get(rightController.getRole)
  .patch(rightController.updateRole)
  .delete(rightController.deleteRole);

module.exports = router;
