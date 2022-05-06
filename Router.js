const auth = require('./router/auth');

/**
 * define App Routes
 * @param {Object} app
 */
const routes = (app) => {
  /**
   * User Authentication
   * path : /api/auth
   */
  app.use('/api/auth', auth);
};

module.exports = routes;
