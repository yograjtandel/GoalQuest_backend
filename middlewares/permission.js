const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { userService } = require("../services");

const permission =
  (...requiredRights) =>
  async (req, res, next) => {
    const user = await userService.getUserById(req.query.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const userRights = user.role.rights;
    const hasRequiredRights = requiredRights.every((requiredRight) =>
      userRights.includes(requiredRight)
    );
    if (!hasRequiredRights && req.query.userId !== user.id) {
      next(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
    }
    next();
  };

module.exports = permission;
