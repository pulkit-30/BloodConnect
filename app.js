const express = require('express');
const app = express();
app.use(express.json());
// DB_connection
const db_connect = require('./connection/db_connect');
db_connect();

// app.get('/', (req, res) => {
//   res.send('Hello');
// });
// App Routes
const Routes = require('./Router');
Routes(app);

const PORT = process.env.PORT || '8080';
app.listen(PORT, () => {
  console.log('server is running at port : ', PORT);
});
