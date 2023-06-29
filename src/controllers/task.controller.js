const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {tasksService} = require('../services');

const createTask = async (req, res) => {
  const tasks = await tasksService.createTasks(req.body);
  res.status(httpStatus.CREATED).send(tasks);
};

const getTasks = async (req, res) => {
  const filter = pick(req.query, ['name', 'task']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tasksService.queryTasks(filter, options);
  res.send(result);
};

const getTask = async (req, res) => {
  const tasks = await tasksService.getTasksById(req.params.tasksId);
  if (!tasks) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tasks not found');
  }
  res.send(tasks);
};

const updateTask = async (req, res) => {
  const tasks = await tasksService.updateTasksById(
    req.params.tasksId,
    req.body
  );
  res.send(tasks);
};

const deleteTask = async (req, res) => {
  await tasksService.deleteTasksById(req.params.tasksId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
