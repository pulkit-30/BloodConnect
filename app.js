require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// App middleware
app.use(express.json());
app.use(cors());

// DB_connection
const db_connect = require('./connection/db_connect');
db_connect();

const search = require('./router/search');
const auth = require('./router/auth');
const message = require('./router/messages');
const token = require('./router/token');
const user = require('./router/user');

/**
 * path: /
 * request: get
 */
app.get('/', (req, res) => {
  res.send('<h1>Hello!! This is backend API for blood Connect</h1>');
});

// App Routes

/**
 * User Authentication
 * path : /api/auth
 */
app.use('/api/auth', auth);

/**
 * User Route
 * path : /api/user/
 */
app.use('/api/user', user);

/**
 * Search Query
 * path : /api/search
 */
app.use('/api/search', search);

/**
 * Messages
 * path : /api/message
 */
app.use('/api/message', message);

/**
 * Token Verification
 * path : /api/token
 */
app.use('/api/token', token);

// Server Listening
const PORT = process.env.PORT || '80';
app.listen(PORT, () => {
  console.log('server is running at port : ', PORT);
});
