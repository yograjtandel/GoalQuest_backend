const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { rolesService } = require("../services");

const createRoles = async (req, res) => {
  const roles = await rolesService.createRoles(req.body);
  res.status(httpStatus.CREATED).send(roles);
};

const getRoless = async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await rolesService.queryRoless(filter, options);
  res.send(result);
};

const getRoles = async (req, res) => {
  const roles = await rolesService.getRolesById(req.params.rolesId);
  if (!roles) {
    throw new ApiError(httpStatus.NOT_FOUND, "Roles not found");
  }
  res.send(roles);
};

const updateRoles = async (req, res) => {
  const roles = await rolesService.updateRolesById(req.params.rolesId, req.body);
  res.send(roles);
};

const deleteRoles = async (req, res) => {
  await rolesService.deleteRolesById(req.params.rolesId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createRoles,
  getRoless,
  getRoles,
  updateRoles,
  deleteRoles,
};
