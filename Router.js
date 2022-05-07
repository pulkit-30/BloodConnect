const search = require('./router/search');
const auth = require('./router/auth');
const message = require('./router/messages');
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
  app.use('/api/message', message);
};

module.exports = routes;
