const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const hostname = process.env.HOST_NAME || 'localhost';
const cors = require('cors');

app.use(cors());

app.use(express.static(__dirname + '/user'))
app.use('/assets', express.static(__dirname + '/user/assets'))
app.use('/css', express.static(__dirname + '/user/assets/css'))
app.use('/js', express.static(path.join(__dirname + '/user/assets/js')));
app.use('/img', express.static(path.join(__dirname + '/user/assets/img')));
app.use('/icon', express.static(path.join(__dirname+ '/user/assets/icon')));
app.use(express.static(__dirname + '/user/views'))

app.use(express.static(__dirname + '/admin'))
app.use('/assets_admin', express.static(__dirname + '/admin/assets'))
app.use('/css_admin', express.static(__dirname + '/admin/assets/css'))
app.use('/js_admin', express.static(path.join(__dirname + '/admin/assets/js')));
app.use('/img_admin', express.static(path.join(__dirname + '/admin/assets/img')));
app.use('/icon_admin', express.static(path.join(__dirname+ '/admin/assets/icon')));
app.use(express.static(__dirname + '/admin/views'));

// views of user
app.use('/about', express.static(path.join(__dirname+ '/user/views/about.html')));
app.use('/catalog', express.static(path.join(__dirname+ '/user/views/catalog1.html')));
app.use('/contacts', express.static(path.join(__dirname+ '/user/views/contacts.html')));
app.use('/details', express.static(path.join(__dirname+ '/user/views/details1.html')));
app.use('/forgot', express.static(path.join(__dirname+ '/user/views/forgot.html')));
app.use('/home', express.static(path.join(__dirname+ '/user/views/home.html')));
app.use('/pricing', express.static(path.join(__dirname+ '/user/views/pricing.html')));
app.use('/profile', express.static(path.join(__dirname+ '/user/views/profile.html')));
app.use('/signin', express.static(path.join(__dirname+ '/user/views/signin.html')));
app.use('/signup', express.static(path.join(__dirname+ '/user/views/signup.html')));

// views of admin
app.use('/admin-catalog', express.static(path.join(__dirname+ '/admin/views/catalog.html')));
app.use('/admin-comments', express.static(path.join(__dirname+ '/admin/views/comments.html')));
app.use('/admin-edit-item', express.static(path.join(__dirname+ '/admin/views/edit-item.html')));
app.use('/admin-add-item', express.static(path.join(__dirname+ '/admin/views/add-item.html')));
app.use('/admin-edit-user', express.static(path.join(__dirname+ '/admin/views/edit-user.html')));
app.use('/admin-forgot', express.static(path.join(__dirname+ '/admin/views/forgot.html')));
app.use('/admin-reviews', express.static(path.join(__dirname+ '/admin/views/reviews.html')));
app.use('/admin-signin', express.static(path.join(__dirname+ '/admin/views/signin.html')));
app.use('/admin-signup', express.static(path.join(__dirname+ '/admin/views/signup.html')));
app.use('/admin-users', express.static(path.join(__dirname+ '/admin/views/users.html')));

// Route chính
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/admin/views/signin.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/user/views/signin.html'));
});

// Khởi động máy chủ
app.listen(port, () => {
    console.log(`Frontend is running on http://${hostname}:${port}`)
});