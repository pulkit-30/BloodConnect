const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
// DB_connection
const db_connect = require('./connection/db_connect');
db_connect();
const search = require('./router/search');
const auth = require('./router/auth');
const message = require('./router/messages');

app.get('/', (req, res) => {
  res.send('Hello');
});

// App Routes
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
/**
 * Messages
 * path : /api/message
 */
app.use('/api/message', message);

// App Listening
const PORT = process.env.PORT || '8080';
app.listen(PORT, () => {
  console.log('server is running at port : ', PORT);
});
