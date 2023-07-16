const httpStatus = require('http-status');
const {Timelog} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a timelog
 * @param {Object} timelogBody
 * @returns {Promise<Timelog>}
 */
const createTimelog = async timelogBody => Timelog.create(timelogBody);

/**
 * Query for timelogs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTimelogs = async (filter, options) => {
  const timelogs = await Timelog.paginate(filter, options);
  return timelogs;
};

/**
 * Get timelog by id
 * @param {ObjectId} id
 * @returns {Promise<Timelog>}
 */
const getTimelogById = async id => Timelog.findById(id);

/**
 * Update timelog by id
 * @param {ObjectId} timelogId
 * @param {Object} updateBody
 * @returns {Promise<Timelog>}
 */
const updateTimelogById = async (timelogId, updateBody) => {
  const timelog = await getTimelogById(timelogId);
  if (!timelog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timelog not found');
  }
  Object.assign(timelog, updateBody);
  await timelog.save();
  return timelog;
};

/**
 * Delete timelog by id
 * @param {ObjectId} timelogId
 * @returns {Promise<Timelog>}
 */
const deleteTimelogById = async timelogId => {
  const timelog = await getTimelogById(timelogId);
  if (!timelog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timelog not found');
  }
  await timelog.remove();
  return timelog;
};

module.exports = {
  createTimelog,
  queryTimelogs,
  getTimelogById,
  updateTimelogById,
  deleteTimelogById,
};
