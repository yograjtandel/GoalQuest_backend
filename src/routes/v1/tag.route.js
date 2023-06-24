const express = require('express');
// const auth = require('../../middlewares/auth');
const tagController = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managetags'), validate(tagValidation.createtag), tagController.createtag)
  .post(tagController.createRole)
  .get(tagController.getRoles);

router
  .route('/:tagId')
  .get(tagController.getRole)
  .patch(tagController.updateRole)
  .delete(tagController.deleteRole);

module.exports = router;
