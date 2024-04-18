require('dotenv').config()
const apiRoutes = require('./routes/api');

const express = require('express')
const app = express()
const port = process.env.PORT || 2000
const hostname = process.env.HOST_NAME || 'localhost'

app.use(express.json()); // config for request.body
app.use(express.urlencoded({ extended: true})); // config for HTML FORM data

app.use('/api', apiRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}/api`)
})