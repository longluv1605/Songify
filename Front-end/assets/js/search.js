document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Lấy giá trị của ô input
    var searchTerm = document.getElementById("search");
    var value = searchTerm.value;
    localStorage.setItem("searchPlaceholder", value);

    // Chuyển hướng trang đến một trang khác với tham số tìm kiếm
    if (value) {
        window.location.href = "search.html";
    } else {
        window.location.href = "shop.html"
    }
});

window.addEventListener("load", function(){
    var savePlaceholder = localStorage.getItem("searchPlaceholder");
    if (savePlaceholder) {
        document.getElementById("search").placeholder = savePlaceholder;
    }
});