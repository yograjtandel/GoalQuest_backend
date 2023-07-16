const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {tagService} = require('../services');

const createTag = async (req, res) => {
  const tags = await tagService.createTags(req.body);
  res.status(httpStatus.CREATED).send(tags);
};

const getTags = async (req, res) => {
  const filter = pick(req.query, ['name', 'stage']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tagService.queryTags(filter, options);
  res.send(result);
};

const getTag = async (req, res) => {
  const tags = await tagService.getTagsById(req.params.tagsId);
  if (!tags) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tags not found');
  }
  res.send(tags);
};

const updateTag = async (req, res) => {
  const tags = await tagService.updateTagsById(req.params.tagsId, req.body);
  res.send(tags);
};

const deleteTag = async (req, res) => {
  await tagService.deleteTagsById(req.params.tagsId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
};
