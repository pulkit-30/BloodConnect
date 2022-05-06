const search = require('./router/search');
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
  /**
   * Search Query
   * path : /api/search
   */
  app.use('/api/search', search);
};

module.exports = routes;
