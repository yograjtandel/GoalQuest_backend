const express = require('express');
// const auth = require('../../middlewares/auth');
const {stageController} = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managestages'), validate(stageValidation.createstage), stageController.createstage)
  .post(stageController.createStage)
  .get(stageController.getStages);

router
  .route('/:stageId')
  .get(stageController.getStage)
  .patch(stageController.updateStage)
  .delete(stageController.deleteStage);

module.exports = router;
