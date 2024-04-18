require('dotenv').config()
const apiRoutes = require('./apis/api');

const express = require('express')
const app = express()
const port = process.env.PORT || 2000
const hostname = process.env.HOST_NAME || 'localhost'

app.use(express.json()); // config for request.body
app.use(express.urlencoded({ extended: true})); // config for HTML FORM data

apiRoutes(app);

app.listen(port, hostname, () => {
  console.log(`Backend is on http://${hostname}:${port}/api`)
})