const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {
  taskService,
  projectService,
  userService,
  tagService,
  stageService,
} = require('../services');

const createTask = async (req, res) => {
  const tasks = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(tasks);
};

const getTaskinitialData = async (req, res) => {
  const filter = pick(req.query, ['name', 'task']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const projects = await projectService.queryProjects(filter, options);
  const users = await userService.queryUsers(filter, options);
  const tags = await tagService.queryTags(filter, options);
  const stags = await stageService.queryStages(filter, options);
  res.send({
    projects: projects.results,
    users: users.results,
    tags: tags.results,
    stags: stags.results,
  });
};

const getTasks = async (req, res) => {
  const filter = pick(req.query, ['name', 'task']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await taskService.queryTasks(filter, options);
  res.send(result);
};

const getTask = async (req, res) => {
  const tasks = await taskService.getTasksById(req.params.tasksId);
  if (!tasks) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tasks not found');
  }
  res.send(tasks);
};

const updateTask = async (req, res) => {
  const tasks = await taskService.updateTasksById(req.params.tasksId, req.body);
  res.send(tasks);
};

const deleteTask = async (req, res) => {
  await taskService.deleteTasksById(req.params.tasksId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createTask,
  getTaskinitialData,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
