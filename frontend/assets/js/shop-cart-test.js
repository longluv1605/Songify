const cart_list = {
    "1": {
      "price": 120.00,
      "image_src": "images/shop/w1.png",
      "link_content": "D-Phone Android",
      "link_href": "shop-single-product.html"
    },
    "2": {
      "price": 120.00,
      "image_src": "images/shop/w2.png",
      "link_content": "Digital Lens Camera",
      "link_href": "shop-single-product.html"
    },
    "3": {
      "price": 120.00,
      "image_src": "images/shop/w3.png",
      "link_content": "Headphone Supersonic",
      "link_href": "shop-single-product.html"
    }
  }

const keys = Object.keys(cart_list)

window.addEventListener('DOMContentLoaded', function() {
  var current_total = 0;
  for (let i = 0;  i < keys.length; i++) {
    key = keys[i];
    const item = cart_list[key];
    var tr = document.createElement("tr")  

    var tdThumbnail = document.createElement("td");
    tdThumbnail.className = "product-thumbnail";
    var thumbnailLink = document.createElement("a");
    thumbnailLink.href =  item["link_href"];
    var thumbnailImg = document.createElement("img");
    thumbnailImg.className = "w-100";
    thumbnailImg.src = item["image_src"];
    thumbnailImg.alt = "Image";
    thumbnailImg.width = 96;
    thumbnailImg.height = 96;
    thumbnailLink.appendChild(thumbnailImg);
    tdThumbnail.appendChild(thumbnailLink);
    tr.appendChild(tdThumbnail);

    var tdName = document.createElement("td");
    tdName.className = "product-name";
    var nameLink = document.createElement("a");
    nameLink.href = item["link_href"];
    nameLink.textContent = item["link_content"];
    var nameHeading = document.createElement("h5");
    nameHeading.appendChild(nameLink);
    tdName.appendChild(nameHeading);
    tr.appendChild(tdName);

    // Tạo cột cho giá sản phẩm
    var tdPrice = document.createElement("td");
    tdPrice.className = "product-price";
    var priceSpan = document.createElement("span");
    priceSpan.className = "amount";
    priceSpan.textContent = "$" + item["price"].toLocaleString();
    tdPrice.appendChild(priceSpan);
    tr.appendChild(tdPrice);

    // Tạo cột cho số lượng
    var tdQuantity = document.createElement("td");
    tdQuantity.className = "cart-quality";
    var quantityDiv1 = document.createElement("div");
    quantityDiv1.className = "product-details-quality";
    var quantityDiv2 = document.createElement("div");
    quantityDiv2.className = "pro-qty";
    var quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.title = "Quantity";
    quantityInput.value = "1";
    quantityDiv2.appendChild(quantityInput);
    quantityDiv1.appendChild(quantityDiv2);
    tdQuantity.appendChild(quantityDiv1);
    tr.appendChild(tdQuantity);

    // Tạo cột cho tổng giá
    var tdTotal = document.createElement("td");
    tdTotal.className = "product-total";
    var totalSpan = document.createElement("span");
    totalSpan.textContent = "$" + item["price"].toLocaleString();
    tdTotal.appendChild(totalSpan);
    tr.appendChild(tdTotal);
    // Tạo cột cho nút xóa
    var tdRemove = document.createElement("td");
    tdRemove.className = "product-remove";
    var removeLink = document.createElement("a");
    removeLink.href = "#/";
    var removeIcon = document.createElement("i");
    removeIcon.className = "fa fa-trash-o";
    removeLink.appendChild(removeIcon);
    tdRemove.appendChild(removeLink);
    tr.appendChild(tdRemove);

    var tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
    current_total += item["price"];
}
    //tính tổng tiền
    var total = document.getElementById("totalAmount")
    total.textContent = "$" + current_total.toLocaleString();
    // xử lý xóa đơn hàng
    var TrashIcons =  document.querySelectorAll(".product-remove i");

    TrashIcons.forEach(function(icon){
    icon.addEventListener("click", function(){
        var tr = icon.closest("tr");
        tr.remove();
      });
    });
});
  


