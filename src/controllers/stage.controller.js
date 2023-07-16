const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {stageService} = require('../services');

const createStage = async (req, res) => {
  const stages = await stageService.createStage(req.body);
  res.status(httpStatus.CREATED).send(stages);
};

const getStages = async (req, res) => {
  const filter = pick(req.query, ['name', 'stage']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await stageService.queryStages(filter, options);
  res.send(result);
};

const getStage = async (req, res) => {
  const stages = await stageService.getStagesById(req.params.stagesId);
  if (!stages) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stages not found');
  }
  res.send(stages);
};

const updateStage = async (req, res) => {
  const stages = await stageService.updateStagesById(
    req.params.stagesId,
    req.body
  );
  res.send(stages);
};

const deleteStage = async (req, res) => {
  await stageService.deleteStagesById(req.params.stagesId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createStage,
  getStages,
  getStage,
  updateStage,
  deleteStage,
};
