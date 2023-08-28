const httpStatus = require('http-status');
const {Right} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a right
 * @param {Object} rightBody
 * @returns {Promise<Right>}
 */
const createRight = async rightBody => Right.create(rightBody);

/**
 * Query for rights
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRights = async (filter, options) => {
  const rights = await Right.paginate(filter, options);
  return rights;
};

/**
 * Get right by id
 * @param {ObjectId} id
 * @returns {Promise<Right>}
 */
const getRightById = async id => Right.findById(id);

/**
 * Update right by id
 * @param {ObjectId} rightId
 * @param {Object} updateBody
 * @returns {Promise<Right>}
 */
const updateRightById = async (rightId, updateBody) => {
  const right = await getRightById(rightId);
  if (!right) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Right not found');
  }
  Object.assign(right, updateBody);
  await right.save();
  return right;
};

/**
 * Delete right by id
 * @param {ObjectId} rightId
 * @returns {Promise<Right>}
 */
const deleteRightById = async rightId => {
  const right = await getRightById(rightId);
  if (!right) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Right not found');
  }
  await right.remove();
  return right;
};

module.exports = {
  createRight,
  queryRights,
  getRightById,
  updateRightById,
  deleteRightById,
};
