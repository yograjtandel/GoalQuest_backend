const httpStatus = require('http-status');
const {Project, Stage} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */
const createProject = async projectBody => Project.create(projectBody);

/**
 * Query for projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
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
//         projects: {
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
const getGroupbyProject = async args => {
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
          from: 'projects',
          localField: '_id',
          foreignField: 'stage',
          as: 'projects',
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
 * Get project by id
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const getProjectById = async id => Project.findById(id);

/**
 * Update project by id
 * @param {ObjectId} projectId
 * @param {Object} updateBody
 * @returns {Promise<Project>}
 */
const updateProjectById = async (projectId, updateBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

/**
 * Delete project by id
 * @param {ObjectId} projectId
 * @returns {Promise<Project>}
 */
const deleteProjectById = async projectId => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getGroupbyProject,
};
