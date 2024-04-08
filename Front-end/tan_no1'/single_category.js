console.log("Hello, this is JavaScript!");
var imagePath = "assets/book.png";
var images = document.getElementsByClassName('cate-picture')

for (var i = 0; i < images.length; i++) {
    images[i].src = imagePath;
}