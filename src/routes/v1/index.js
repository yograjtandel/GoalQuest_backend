const express = require('express');
const roleRoute = require('./role.route');
const userRoute = require('./user.route');
const projectRote = require('./project.route');
const rightRoute = require('./rights.route');
const stageRoute = require('./stage.route');
const tagRoute = require('./tag.route');
const taskRoute = require('./task.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/project',
    route: projectRote,
  },
  {
    path: '/rights',
    route: rightRoute,
  },
  {
    path: '/stage',
    route: stageRoute,
  },
  {
    path: '/tag',
    route: tagRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

// const devRoutes = [
// routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
