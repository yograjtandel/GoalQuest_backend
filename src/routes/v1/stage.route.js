const express = require('express');
// const auth = require('../../middlewares/auth');
const stageController = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managestages'), validate(stageValidation.createstage), stageController.createstage)
  .post(stageController.createRole)
  .get(stageController.getRoles);

router
  .route('/:stageId')
  .get(stageController.getRole)
  .patch(stageController.updateRole)
  .delete(stageController.deleteRole);

module.exports = router;
