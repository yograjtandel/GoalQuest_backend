const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const {userController} = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .post(validate(userValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:email')
  .get(validate(userValidation.getUserByEmail), userController.getUserByEmail);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
