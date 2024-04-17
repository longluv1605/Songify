const categoryImages = {
    "1": "images/shop/1.jpg",
    "2": "images/shop/1.jpg",
    "3": "images/shop/1.jpg",
    "4": "images/shop/1.jpg",
    "5": "images/shop/1.jpg",
    "6": "images/shop/1.jpg",
    "7": "images/shop/1.jpg",
    "8": "images/shop/1.jpg",
    "9": "images/shop/1.jpg",
    "10": "images/shop/1.jpg",
    "11": "images/shop/1.jpg",
    "12": "images/shop/1.jpg",
    "13": "images/shop/1.jpg",
    "14": "images/shop/1.jpg",
    "15": "images/shop/1.jpg"
  };

  document.addEventListener('DOMContentLoaded', function() {
    elements = document.querySelectorAll('.product-item-thumb')
    for (let i = 0; i < elements.length; i++) {
        let img = elements[i].querySelector('img');
        img.src = categoryImages[(i + 1).toString()];
}
});

