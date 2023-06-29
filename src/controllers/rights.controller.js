const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {rightService} = require('../services');

const createRight = async (req, res) => {
  const right = await rightService.createRight(req.body);
  res.status(httpStatus.CREATED).send(right);
};

const getRights = async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rightService.queryRights(filter, options);
  res.send(result);
};

const getRight = async (req, res) => {
  const right = await rightService.getRightById(req.params.rightId);
  if (!right) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Right not found');
  }
  res.send(right);
};

const updateRight = async (req, res) => {
  const right = await rightService.updateRightById(
    req.params.rightId,
    req.body
  );
  res.send(right);
};

const deleteRight = async (req, res) => {
  await rightService.deleteRightById(req.params.rightId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createRight,
  getRights,
  getRight,
  updateRight,
  deleteRight,
};
