const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const hostname = process.env.HOST_NAME || 'localhost';

app.use(express.static(__dirname + '/user'))
app.use('/assets', express.static(__dirname + '/user/assets'))
app.use('/css', express.static(__dirname + '/user/assets/css'))
app.use('/js', express.static(path.join(__dirname + '/user/assets/js')));
app.use('/img', express.static(path.join(__dirname + '/user/assets/img')));
app.use('/icon', express.static(path.join(__dirname+ '/user/assets/icon')));
app.use(express.static(__dirname + '/user/views'))

app.use(express.static(__dirname + '/admin'))
app.use('/assets', express.static(__dirname + '/admin/assets'))
app.use('/css', express.static(__dirname + '/admin/assets/css'))
app.use('/js', express.static(path.join(__dirname + '/admin/assets/js')));
app.use('/img', express.static(path.join(__dirname + '/admin/assets/img')));
app.use('/icon', express.static(path.join(__dirname+ '/admin/assets/icon')));
app.use(express.static(__dirname + '/admin/views'))


// Route chính
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/admin/views/catalog.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/user/views/index.html'));
  });

// Khởi động máy chủ

app.listen(port, () => {
    console.log(`Admin is running on http://${hostname}:${port}`)
});