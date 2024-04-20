const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
const hostname = process.env.HOST_NAME || 'localhost'

app.use(express.static(__dirname + '/assets'))
app.use('/css', express.static(__dirname + '/assets/css'))
app.use('/js', express.static(path.join(__dirname + '/assets/js')));
app.use('/img', express.static(path.join(__dirname + '/assets/img')));
app.use('/icon', express.static(path.join(__dirname+ '/assets/icon')));
app.use(express.static(__dirname + '/views'));


// Route chính
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

// Khởi động máy chủ

app.listen(port, () => {
    console.log(`User is running on http://${hostname}:${port}`)
});