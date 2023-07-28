const httpStatus = require('http-status');
const dashboardService = require('../services/dashboard.service');

const getDashboardData = async (req, res) => {
  const dashboardData = await dashboardService.getDashboardData();
  res.status(httpStatus.CREATED).send(dashboardData);
};

module.exports = {
  getDashboardData,
};
