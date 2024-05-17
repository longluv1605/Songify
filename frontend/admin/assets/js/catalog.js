var Admin_Data = {id: 12312412, firstName: "David", lastName: "Đặng"};

var Catalog_Data = [
    {id: 1, title: "Midnight Sun", catalogs: "Comedy", rating: 7.1, views: 1250, status: "Hidden", created_date: "05.02.2023"},
    {id: 2, title: "The Shadow Hunter", catalogs: "Romance", rating: 6.3, views: 1453, status: "Visible", created_date: "05.02.2023"},
    {id: 3, title: "Wild Hearts", catalogs: "Drama", rating: 6.3, views: 893, status: "Hidden", created_date: "05.02.2023"},
    {id: 4, title: "Blindspotting", catalogs: "Action", rating: 7.9, views: 1452, status: "Visible", created_date: "04.02.2023"},
    {id: 5, title: "Tales from the Underworld", catalogs: "Western", rating: 8.6, views: 487, status: "Visible", created_date: "04.02.2023"},
    {id: 6, title: "Midnight Sun", catalogs: "Drama", rating: 7.7, views: 341, status: "Hidden", created_date: "04.02.2023"},
    {id: 7, title: "Wild Hearts", catalogs: "Comedy", rating: 8.2, views: 2103, status: "Hidden", created_date: "04.02.2023"},
    {id: 8, title: "Red Sky at Night", catalogs: "Comedy", rating: 7.1, views: 978, status: "Visible", created_date: "03.02.2023"},
    {id: 9, title: "The Forgotten Road", catalogs: "Music", rating: 6.3, views: 6441, status: "Hidden", created_date: "03.02.2023"},
    {id: 10, title: "Echoes of the Past", catalogs: "Fantasy", rating: 9.2, views: 1354, status: "Visible", created_date: "03.02.2023"},
    {id: 11, title: "Echoes of Yesterday", catalogs: "Trailer", rating: 8.4, views: 654, status: "Visible", created_date: "02.02.2023"},
    {id: 12, title: "The Last Hope", catalogs: "Documentary", rating: 7.3, views: 6431, status: "Hidden", created_date: "02.02.2023"},
    {id: 13, title: "The Edge of Tomorrow", catalogs: "Sci-Fi", rating: 8.4, views: 103, status: "Hidden", created_date: "02.02.2023"},
    {id: 14, title: "A Light in the Darkness", catalogs: "Comedy", rating: 7.9, views: 6574, status: "Visible", created_date: "02.02.2023"},
    {id: 15, title: "Endless Horizon", catalogs: "Trailer", rating: 8.4, views: 5412, status: "Visible", created_date: "01.02.2023"},
    {id: 16, title: "Beyond the Horizon", catalogs: "Drama", rating: 7.1, views: 647, status: "Hidden", created_date: "01.02.2023"},
    {id: 17, title: "Reckoning", catalogs: "Romance", rating: 6.3, views: 4646, status: "Visible", created_date: "30.01.2023"},
    {id: 18, title: "Savage Beauty", catalogs: "Comedy", rating: 7.9, views: 5614, status: "Hidden", created_date: "29.01.2023"}
];

function changeNameOfAdmin(firstName, lastName) {
    var name = document.getElementById("add-name-of-admin");
    name.innerText = firstName + " " + lastName;
};

function changeAdminName(data){
    changeNameOfAdmin(data.firstName, data.lastName);
};

function createActiveButton(){
    var div = document.createElement("div");
    div.className = "catalog__btns";
    var button1 = document.createElement("button");
    button1.type = "button";
    button1.setAttribute("data-bs-toggle", "modal");
    button1.className = "catalog__btn catalog__btn--banned";
    button1.setAttribute("data-bs-target", "#modal-status");
    var svg_of_button1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_of_button1.setAttribute("viewBox", "0 0 24 24");
    var path_of_svg_button1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_of_svg_button1.setAttribute("d", "M12,13a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V14A1,1,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z");
    svg_of_button1.appendChild(path_of_svg_button1);
    button1.appendChild(svg_of_button1);
    div.appendChild(button1);
    var a2 = document.createElement("a");
    a2.href = "edit-item.html";
    a2.className = "catalog__btn catalog__btn--edit";
    var svg_of_a2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_of_a2.setAttribute("viewBox", "0 0 24 24");
    var path_of_svg_a2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_of_svg_a2.setAttribute("d", "M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z");
    svg_of_a2.appendChild(path_of_svg_a2);
    a2.appendChild(svg_of_a2);
    div.appendChild(a2);
    var button2 = document.createElement("button");
    button2.type = "button";
    button2.setAttribute("data-bs-toggle", "modal");
    button2.className = "catalog__btn catalog__btn--delete";
    button2.setAttribute("data-bs-target", "#modal-delete");
    var svg_of_button2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_of_button2.setAttribute("viewBox", "0 0 24 24");
    var path_of_svg_button2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_of_svg_button2.setAttribute("d", "M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z");
    svg_of_button2.appendChild(path_of_svg_button2);
    button2.appendChild(svg_of_button2);
    div.appendChild(button2);
    return div;
};

function createLineNewItem(id, title, catalogs, rating, views, status, created_date){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var div1 = document.createElement("div");
    div1.className = "catalog__text";
    div1.textContent = id;
    td1.appendChild(div1);
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    var div2 = document.createElement("div");
    div2.className = "catalog__text";
    var a = document.createElement("a");
    a.href = "#";
    a.textContent = title;
    div2.appendChild(a);
    td2.appendChild(div2);
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    var div3 = document.createElement("div");
    div3.className = "catalog__text catalog__text--rate";
    div3.textContent = rating;
    td3.appendChild(div3);
    tr.appendChild(td3);
    var td4 = document.createElement("td");
    var div4 = document.createElement("div");
    div4.className = "catalog__text";
    div4.textContent = catalogs;
    td4.appendChild(div4);
    tr.appendChild(td4);
    var td5 = document.createElement("td");
    var div5 = document.createElement("div");
    div5.className = "catalog__text";
    div5.textContent = views;
    td5.appendChild(div5);
    tr.appendChild(td5);
    var td6 = document.createElement("td");
    var div6 = document.createElement("div");
    if (status === "Hidden") {
        div6.className = "catalog__text catalog__text--red";
        div6.textContent = status;
    } else if (status === "Visible") {
        div6.className = "catalog__text catalog__text--green";
        div6.textContent = status;
    }
    td6.appendChild(div6);
    tr.appendChild(td6);
    var td7 = document.createElement("td");
    var div7 = document.createElement("div");
    div7.className = "catalog__text";
    div7.textContent = created_date;
    td7.appendChild(div7);
    tr.appendChild(td7);
    var td8 = document.createElement("td");
    var div8 = createActiveButton();
    td8.appendChild(div8);
    tr.appendChild(td8);
    return tr;
};

function add_data_for_table_items(dataset){
    var lists = document.getElementById("add-data-for-table-items");
    dataset.forEach(function(data){
        var list = createLineNewItem(data.id, data.title, data.catalogs, data.rating, data.views, data.status, data.created_date);
        lists.appendChild(list);
    });
};


function confirmDelete() {
    var lastClickedRow;

    var showButtons = document.getElementById('add-data-for-table-items').querySelectorAll('tr');

    // Gắn sự kiện click cho mỗi button
    showButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Lưu trữ hàng được click trước đó
            lastClickedRow = button;
        });
    });

    // Lấy nút xóa hàng
    var deleteButton = document.getElementById('deleteButton');

    // Gắn sự kiện click cho nút xóa hàng
    deleteButton.addEventListener('click', function() {
        // Kiểm tra xem có hàng được click trước đó không
        if (lastClickedRow) {
            // Xóa hàng được click trước đó
            lastClickedRow.parentNode.removeChild(lastClickedRow);
            lastClickedRow = null; // Đặt lại biến lastClickedRow
        }
    });
};

function confirmApply() {
    var lastClickedRow;

    var showButtons = document.getElementById('add-data-for-table-items').querySelectorAll('tr');

    // Gắn sự kiện click cho mỗi button
    showButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Lưu trữ hàng được click trước đó
            lastClickedRow = button;
        });
    });

    // Lấy nút apply hàng
    var deleteButton = document.getElementById('applyButton');

    // Gắn sự kiện click cho nút apply hàng
    deleteButton.addEventListener('click', function() {
        // Kiểm tra xem có hàng được click trước đó không
        if (lastClickedRow) {
            var cellsToEdit = lastClickedRow.getElementsByTagName('td');
            var cellToEdit = cellsToEdit[5];
            // Chỉnh sửa giá trị của cột
            if (cellToEdit.textContent == "Hidden") {
                cellToEdit.className = "catalog__text catalog__text--green";
                cellToEdit.textContent = "Visible";
            } else if (cellToEdit.textContent == "Visible") {
                cellToEdit.className = "catalog__text catalog__text--red";
                cellToEdit.textContent = "Hidden";
            };
            
            lastClickedRow = null; // Đặt lại biến lastClickedRow
        }
    });
};

const fetchData = async () => {
    try {
        const token_admin = localStorage.getItem('token_admin');
        const response = await axios.get('https:/localhost:8080/admin/movies',
            {
                headers:{
                    'Authorization': 'Bearer ' + token_admin
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener("DOMContentLoaded", function(){
    fetchData();
    changeAdminName(Admin_Data);
    add_data_for_table_items(Catalog_Data);
    confirmDelete();
    confirmApply();
});