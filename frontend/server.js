const express = require('express');
const app = express();
const path = require('path');
const port = 3000


app.use(express.static(__dirname + '/assets'))
app.use('/css', express.static(__dirname + '/assets/css'))
app.use('/js', express.static(path.join(__dirname + '/assets/js')));
app.use('/images', express.static(path.join(__dirname + '/assets/images')));
app.use('/fonts', express.static(path.join(__dirname + '/assets/fonts')));
app.use(express.static(__dirname + '/view'))


// Route chính
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/bought_orders.html'));
});

// Khởi động máy chủ

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
