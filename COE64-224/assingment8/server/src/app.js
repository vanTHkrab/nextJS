const express = require('express')
const app = express()
const pool = require('./lib/db')
const port = process.env.SERVER_PORT || 3000
const url = process.env.SERVER_URL || 'http://localhost'
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Server url: ${url}:${port}`)
    console.log(`Server is running on port ${port}`)
});

app.use('/clinic', require('./router/clinic.js')(pool))
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Something went wrong')
});

module.exports = app;