const express = require('express');
// const auth = require('../../middlewares/auth');
const roleController = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('manageroles'), validate(roleValidation.createrole), roleController.createrole)
  .post(roleController.createRole)
  .get(roleController.getRoles);

router
  .route('/:roleId')
  .get(roleController.getRole)
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
