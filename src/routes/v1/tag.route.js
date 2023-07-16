const express = require('express');
// const auth = require('../../middlewares/auth');
const {tagController} = require('../../controllers');

const router = express.Router();

router
  .route('/')
  //   .post(auth('managetags'), validate(tagValidation.createtag), tagController.createtag)
  .post(tagController.createTag)
  .get(tagController.getTags);

router
  .route('/:tagId')
  .get(tagController.getTag)
  .patch(tagController.updateTag)
  .delete(tagController.deleteTag);

module.exports = router;
