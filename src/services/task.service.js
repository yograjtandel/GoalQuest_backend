const httpStatus = require('http-status');
const {Task, Stage} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async taskBody => Task.create(taskBody);

/**
 * Query for tasks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

// [
//     {
//       $lookup: {
//         from: 'stages',
//         localField: 'stage',
//         foreignField: '_id',
//         as: 'display_sequence',
//       },
//     },
//     {
//       $set: {
//         display_sequence: {
//           $arrayElemAt: ['$display_sequence.display_sequence', 0],
//         },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           stage: `$${args.group}`,
//           display_sequence: '$display_sequence',
//         },
//         tasks: {
//           $push: '$$ROOT',
//         },
//       },
//     },
//     {
//       $sort: {
//         '_id.display_sequence': args.sort || 1,
//       },
//     },
//   ]

const getGroupbyTask = async args => {
  const res = await Stage.aggregate([
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: 'tasks',
          localField: '_id',
          foreignField: 'stage.id',
          as: 'tasks',
        },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          display_sequence: args.sort || 1,
        },
    },
  ]);

  return res;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async id => Task.findById(id);

/**
 * Update task by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Delete task by id
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async taskId => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  getGroupbyTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
