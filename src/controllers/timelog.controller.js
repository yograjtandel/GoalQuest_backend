const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {timelogService} = require('../services');

const createTimelog = async (req, res) => {
  const timelog = await timelogService.createTimelog(req.body);
  res.status(httpStatus.CREATED).send(timelog);
};

const getTimelogs = async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await timelogService.queryTimelogs(filter, options);
  res.send(result);
};

const getTimelog = async (req, res) => {
  const timelog = await timelogService.getTimelogById(req.params.timelogId);
  if (!timelog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timelog not found');
  }
  res.send(timelog);
};

const updateTimelog = async (req, res) => {
  const timelog = await timelogService.updateTimelogById(
    req.params.timelogId,
    req.body
  );
  res.send(timelog);
};

const deleteTimelog = async (req, res) => {
  await timelogService.deleteTimelogById(req.params.timelogId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createTimelog,
  getTimelogs,
  getTimelog,
  updateTimelog,
  deleteTimelog,
};
