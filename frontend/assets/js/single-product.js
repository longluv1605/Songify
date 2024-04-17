var data = {
    state: "New",
    name: "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
    image: "images/single-product/macbook.webp",
    statistic: [
        {core: "I9-13900H", storage: "16GB - 512GB", card: "RTX4060", price: "32.490.000"},
        {core: "I7-13620H", storage: "16GB - 512GB", card: "RTX4060", price: "29.990.000"},
        {core: "I5-12500H", storage: "8GB - 512GB", card: "RTX4060", price: "19.490.000"}
    ],
    color: [
        {image: "images/single-product/vang.webp", cl: "Vàng"},
        {image: "images/single-product/xam.webp", cl: "Xám"},
        {image: "images/single-product/bac.webp", cl: "Bạc"}
    ]
};

var product_infomation = document.getElementById("product-infomation-and-image");

// 1.Tạo div thứ nhất chứa ảnh chính (img)
var div1 = document.createElement("div");
div1.className = "col-sm-4";
div1.style.paddingTop = "15px";
div1.style.paddingBottom = "15px";
// 1.1.Ảnh chính của sản phẩm
var imagebig = document.createElement("img");
imagebig.id = "product-image-big";
imagebig.src = data.image;
imagebig.alt = "Ảnh";
div1.appendChild(imagebig);
product_infomation.appendChild(div1);

// 2.Tạo div thứ 2 chứa 2 div phụ (chứa các thông tin của sản phẩm)
var div2 = document.createElement("div");
div2.className = "col-sm-8";
div2.style.paddingTop = "15px";
div2.style.paddingBottom = "15px";

// 2.1.Tạo div phụ thứ 1 chứa 1 div con và 1 span
var div2_1 = document.createElement("div");
div2_1.className = "product-name";
// 2.1.1.div con
var div2_1_1 = document.createElement("div");
div2_1_1.className = "love";
div2_1_1.textContent = data.state;
div2_1.appendChild(div2_1_1);
// 2.1.2.span
var div2_1_span = document.createElement("span");
div2_1_span.textContent = data.name;
div2_1.appendChild(div2_1_span);
div2.appendChild(div2_1);

// 2.2.Tạo div phụ thứ 2 chứa 2 section
var div2_2 = document.createElement("div");
div2_2.className = "flex flex-column";
// 2.2.1.Tạo section đầu tiên chứa thông số của sản phẩm
var div2_2_section1 = document.createElement("section");
div2_2_section1.className = "flex items-center table-choice-size col-sm-12";
div2_2_section1.style.marginBottom = "24px";
var div_row1 = document.createElement("div");
div_row1.className = "row";
// 2.2.1.1
var div_row1_h3 = document.createElement("h3");
div_row1_h3.className = "col-sm-3 title";
div_row1_h3.textContent = "THÔNG SỐ";
div_row1.appendChild(div_row1_h3);
// 2.2.1.2
var div_row1_div = document.createElement("div");
div_row1_div.className = "flex items-center col-sm-9";
data.statistic.forEach(function(item){
    var div_row1_div_button = document.createElement("button");
    div_row1_div_button.className = "your-choice";
    var button_h2_1 = document.createElement("h2");
    button_h2_1.textContent = item.core;
    div_row1_div_button.appendChild(button_h2_1);
    var button_h2_2 = document.createElement("h2");
    button_h2_2.textContent = item.storage;
    div_row1_div_button.appendChild(button_h2_2);
    var button_h2_3 = document.createElement("h2");
    button_h2_3.textContent = item.core;
    div_row1_div_button.appendChild(button_h2_3);
    var button_h3 = document.createElement("h3");
    button_h3.textContent = item.price + " đ";
    div_row1_div_button.appendChild(button_h3);

    div_row1_div.appendChild(div_row1_div_button);
});
div_row1.appendChild(div_row1_div);
div2_2_section1.appendChild(div_row1);
div2_2.appendChild(div2_2_section1);

// 2.2.2.Tạo section thứ 2
var div2_2_section2 = document.createElement("section");
div2_2_section2.className = "flex items-center table-choice-color col-sm-12";
div2_2_section1.style.marginBottom = "24px";
var div_row2 = document.createElement("div");
div_row2.className = "row";
// 2.2.2.1
var div_row2_h3 = document.createElement("h3");
div_row2_h3.className = "col-sm-3 title";
div_row2_h3.textContent = "MÀU SẮC";
div_row2.appendChild(div_row2_h3);
// 2.2.2.2
var div_row2_div = document.createElement("div");
div_row2_div.className = "flex items-center col-sm-9";
data.color.forEach(function(item){
    var div_row2_div_button = document.createElement("button");
    div_row2_div_button.className = "your-choice change";
    var image_button = document.createElement("img");
    image_button.className = "image-choice";
    image_button.src = item.image;
    image_button.alt = "Color";
    div_row2_div_button.textContent = item.cl;
    div_row2_div_button.appendChild(image_button);
    div_row2_div.appendChild(div_row2_div_button);
});
div_row2.appendChild(div_row2_div);
div2_2_section2.appendChild(div_row2);
div2_2.appendChild(div2_2_section2);
div2.appendChild(div2_2);

// 2.3.Tạo div phụ thứ 3 là nút thêm vào giỏ hàng và mua ngay
var div2_3 = document.createElement("div");
div2_3.style.display = "flex";
div2_3.style.alignItems = "center";
div2_3.style.marginTop = "30px";
// 2.3.1.Tạo nút button Thêm vào giỏ hàng
var div2_3_button1 = document.createElement("button");
div2_3_button1.className = "add-to-cart";
div2_3_button1.type = "button";
// 2.3.1.1.Thêm ảnh
var div2_3_button1_img = document.createElement("img");
div2_3_button1_img.src = "images/icons/add-to-cart.png";
div2_3_button1_img.style.width = "30px";
div2_3_button1_img.style.height = "30px";
div2_3_button1_img.style.marginRight = "5px";
div2_3_button1.appendChild(div2_3_button1_img);
// 2.3.1.2.Thêm content
var div2_3_button1_span = document.createElement("span");
div2_3_button1_span.className = "add-now";
div2_3_button1_span.textContent = "Thêm Vào Giỏ Hàng";
div2_3_button1.appendChild(div2_3_button1_span);
div2_3.appendChild(div2_3_button1);
// 2.3.1.Tạo nút button Mua ngay
var div2_3_button2 = document.createElement("button");
div2_3_button2.className = "buy-now";
div2_3_button2.type = "button";
div2_3_button2.textContent = "Mua Ngay";
div2_3.appendChild(div2_3_button2);
div2.appendChild(div2_3);

product_infomation.appendChild(div2);