require('dotenv').config()
const api = require('./apis/api');

const express = require('express')
const app = express()
const port = process.env.PORT || 2000
const hostname = process.env.HOST_NAME || 'localhost'

app.use(express.json()); // config for request.body
app.use(express.urlencoded({ extended: true})); // config for HTML FORM data

api(app);

app.listen(port, hostname, () => {
  console.log(`Backend is running on http://${hostname}:${port}`)
})