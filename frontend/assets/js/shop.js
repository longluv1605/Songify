var data = [
    {id: 2, value: {name: "Máy Tính", price: "120.000 đ", image: "images/shop/2.jpg"}},
    {id: 3, value: {name: "Tai Nghe", price: "120.000 đ", image: "images/shop/3.jpg"}},
    {id: 4, value: {name: "Loa Bluetooth", price: "120.000 đ", image: "images/shop/4.jpg"}},
    {id: 5, value: {name: "Máy Chơi Game", price: "120.000 đ", image: "images/shop/5.jpg"}},
    {id: 6, value: {name: "Loa Bluetooth", price: "120.000 đ", image: "images/shop/6.jpg"}},
    {id: 7, value: {name: "Sạc Dự Phòng", price: "120.000 đ", image: "images/shop/7.jpg"}},
    {id: 8, value: {name: "Camera", price: "120.000 đ", image: "images/shop/8.jpg"}},
    {id: 9, value: {name: "Đồng Hồ", price: "120.000 đ", image: "images/shop/9.jpg"}},
    {id: 13, value: {name: "Loa Bluetooth", price: "120.000 đ", image: "images/shop/13.jpg"}},
    {id: 14, value: {name: "Loa Bluetooth", price: "120.000 đ", image: "images/shop/14.jpg"}},
    {id: 15, value: {name: "Máy Ảnh", price: "120.000 đ", image: "images/shop/15.jpg"}},
    {id: 20, value: {name: "Máy Chơi Game", price: "120.000 đ", image: "images/shop/b5.jpg"}},
    {id: 23, value: {name: "Camera", price: "120.000 đ", image: "images/shop/b8.jpg"}},
    {id: 24, value: {name: "Loa Bluetooth", price: "120.000 đ", image: "images/shop/b9.jpg"}}
];

var container = document.getElementById("add-product");

data.forEach(function(item){
    var div = document.createElement("div");
    div.className = "col-sm-6 col-lg-6 col-xl-4 mb-6";

    var divcon1 = document.createElement("div");
    divcon1.className = "product-item";

    var a = document.createElement("a");
    a.className = "product-item-thumb";
    a.href = "single-product.html";

    var img = document.createElement("img");
    img.src =  item.value.image;
    img.width = 270;
    img.height = 264;
    img.alt = "Image-HasTech";
    a.appendChild(img);

    var span = document.createElement("span");
    

    var div_1_1 = document.createElement("div");
    div_1_1.className = "product-item-info text-center pb-6";

    var h5 = document.createElement("h5");
    h5.className = "product-item-title mb-2";

    var a_h5 = document.createElement("a");
    a_h5.textContent = item.value.name;
    a_h5.href = "single-product.html";
    h5.appendChild(a_h5);
    div_1_1.appendChild(h5);

    var div_1_1_1 = document.createElement("div");
    div_1_1_1.className = "product-item-price";
    div_1_1_1.textContent = item.value.price;

    var span_div_1_1_1 = document.createElement("span");
    span_div_1_1_1.className = "price-old";
    span_div_1_1_1.textContent = item.value.price;
    div_1_1_1.appendChild(span_div_1_1_1);
    div_1_1.appendChild(div_1_1_1);

    var div_1_1_2 = document.createElement("div");
    div_1_1_2.className = "product-item-review-icon";
    for(let i=0; i<5; i++) {
        var li = document.createElement("i");
        li.className = "fa fa-star";
        div_1_1_2.appendChild(li);
    }
    div_1_1.appendChild(div_1_1_2);

    divcon1.appendChild(a);
    divcon1.appendChild(span);
    divcon1.appendChild(div_1_1);

    div.appendChild(divcon1);

    container.appendChild(div);
}); 
