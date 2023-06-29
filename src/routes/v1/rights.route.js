const express = require('express');
// const auth = require('../../middlewares/auth');
const {rightController} = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managerights'), validate(rightValidation.createright), rightController.createright)
  .post(rightController.createRight)
  .get(rightController.getRights);

router
  .route('/:rightId')
  .get(rightController.getRight)
  .patch(rightController.updateRight)
  .delete(rightController.deleteRight);

module.exports = router;
