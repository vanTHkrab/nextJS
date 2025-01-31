const express = require('express');
const app = express();
const pool = require('./lib/db');
const port = process.env.SERVER_PORT || 3000;
const url = process.env.SERVER_URL || 'http://localhost';
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at ${url}:${port}`);
});