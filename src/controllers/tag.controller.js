const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {stagesService} = require('../services');

const createStages = async (req, res) => {
  const stages = await stagesService.createStages(req.body);
  res.status(httpStatus.CREATED).send(stages);
};

const getStages = async (req, res) => {
  const filter = pick(req.query, ['name', 'stage']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await stagesService.queryStages(filter, options);
  res.send(result);
};

const getStage = async (req, res) => {
  const stages = await stagesService.getStagesById(req.params.stagesId);
  if (!stages) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stages not found');
  }
  res.send(stages);
};

const updateStages = async (req, res) => {
  const stages = await stagesService.updateStagesById(
    req.params.stagesId,
    req.body
  );
  res.send(stages);
};

const deleteStages = async (req, res) => {
  await stagesService.deleteStagesById(req.params.stagesId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createStages,
  getStages,
  getStage,
  updateStages,
  deleteStages,
};
