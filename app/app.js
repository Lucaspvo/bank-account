const express = require('express');
const cors = require('cors');
const app = express();
const port = 3030;
const accounts = require('./routes/accounts');
const bodyParser = require('body-parser')

const corsOptions = {
  origin: 'http://localhost',
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/accounts', accounts);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
