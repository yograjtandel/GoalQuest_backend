const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const {roleService} = require('../services');

const createRole = async (req, res) => {
  const roles = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(roles);
};

const getRoles = async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roleService.queryRoles(filter, options);
  res.send(result);
};

const getRole = async (req, res) => {
  const roles = await roleService.getRolesById(req.params.rolesId);
  if (!roles) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Roles not found');
  }
  res.send(roles);
};

const updateRole = async (req, res) => {
  const roles = await roleService.updateRolesById(req.params.rolesId, req.body);
  res.send(roles);
};

const deleteRole = async (req, res) => {
  await roleService.deleteRolesById(req.params.rolesId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};
