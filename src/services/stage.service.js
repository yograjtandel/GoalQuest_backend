const httpStatus = require('http-status');
const {Stage} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a stage
 * @param {Object} stageBody
 * @returns {Promise<Stage>}
 */
const createStage = async stageBody => Stage.create(stageBody);

/**
 * Query for stages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStages = async (filter, options) => {
  const stages = await Stage.paginate(filter, options);
  return stages;
};

/**
 * Get stage by id
 * @param {ObjectId} id
 * @returns {Promise<Stage>}
 */
const getStageById = async id => Stage.findById(id);

/**
 * Update stage by id
 * @param {ObjectId} stageId
 * @param {Object} updateBody
 * @returns {Promise<Stage>}
 */
const updateStageById = async (stageId, updateBody) => {
  const stage = await getStageById(stageId);
  if (!stage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stage not found');
  }
  Object.assign(stage, updateBody);
  await stage.save();
  return stage;
};

/**
 * Delete stage by id
 * @param {ObjectId} stageId
 * @returns {Promise<Stage>}
 */
const deleteStageById = async stageId => {
  const stage = await getStageById(stageId);
  if (!stage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stage not found');
  }
  await stage.remove();
  return stage;
};

module.exports = {
  createStage,
  queryStages,
  getStageById,
  updateStageById,
  deleteStageById,
};
