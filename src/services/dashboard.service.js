const {Task} = require('../models');
// const toJSON = require('../models/plugins/toJSON.plugin');

exports.getDashboardData = async () => {
  const unassigned = await Task.find({
    'asignee.0': {$not: {$exists: true}},
  }).count();
  const overdue = await Task.where('deadline').gt(new Date()).count();
  const duetoday = await Task.where('deadline').eq(new Date()).count();
  return {unassigned, overdue, duetoday};
};
