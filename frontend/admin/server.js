const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('assets'))
app.use('/css', express.static(__dirname + 'assets/css'))
app.use('/js', express.static(path.join(__dirname + 'assets/js')));
app.use('/img', express.static(path.join(__dirname + 'assets/img')));
app.use('/icon', express.static(path.join(__dirname+ 'assets/icon')));
app.use(express.static('views'))


// Route chính
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/homepage.html'));
});

// Khởi động máy chủ

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
