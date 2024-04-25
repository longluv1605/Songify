var Admin_Data = {id: 12312412, firstName: "David", lastName: "Đặng"};

var User_Infomation_Data = [
    {id: 1, info:{name: "Tess Harper", email: "TessHarper@gmail.com"}, userName: "Tess Harper", pricing: "Premium", commented: 13, reviewed: 1, status: "Approved", created_date: "05.02.2023"},
    {id: 2, info:{name: "Tess Harper", email: "GeneGraham@gmail.com"}, userName: "Tess Harper", pricing: "Free", commented: 1, reviewed: 15, status: "Approved", created_date: "05.02.2023"},
    {id: 3, info:{name: "Rosa Lee", email: "RosaLee@gmail.com"}, userName: "Rosa Lee", pricing: "Premium", commented: 6, reviewed: 6, status: "Approved", created_date: "04.02.2023"},
    {id: 4, info:{name: "Matt Jones", email: "MattJones@gmail.com"}, userName: "Matt Jones", pricing: "Free", commented: 11, reviewed: 15, status: "Banned", created_date: "04.02.2023"},
    {id: 5, info:{name: "Brian Cranston", email: "BrianCranston@gmail.com"}, userName: "Brian Cranston", pricing: "Basic", commented: 0, reviewed: 0, status: "Approved", created_date: "04.02.2023"},
    {id: 6, info:{name: "Louis Leterrier", email: "LouisLeterrier@gmail.com"}, userName: "Louis Leterrier", pricing: "Free", commented: 2, reviewed: 1, status: "Approved", created_date: "03.02.2023"},
    {id: 7, info:{name: "Son Gun", email: "SonGun@gmail.com"}, userName: "Son Gun", pricing: "Cinematic", commented: 65, reviewed: 0, status: "Approved", created_date: "02.02.2023"},
    {id: 8, info:{name: "Jordana Brewster", email: "JordanaBrewster@gmail.com"}, userName: "Jordana Brewster", pricing: "Premium", commented: 0, reviewed: 0, status: "Banned", created_date: "02.02.2023"},
    {id: 9, info:{name: "Tyreese Gibson", email: "TyreeseGibson@gmail.com"}, userName: "Tyreese Gibson", pricing: "Premium", commented: 13, reviewed: 1, status: "Approved", created_date: "01.02.2023"},
    {id: 10, info:{name: "Charlize Theron", email: "CharlizeTheron@gmail.com"}, userName: "Charlize Theron", pricing: "Free", commented: 1, reviewed: 15, status: "Banned", created_date: "01.02.2023"},
    {id: 11, info:{name: "Long", email: "Long@gmail.com"}, userName: "Long Boss", pricing: "Cinematic", commented: 78, reviewed: 65, status: "Approved", created_date: "01.02.2023"},
    {id: 12, info:{name: "Minh", email: "Minh@gmail.com"}, userName: "Minh RickKid", pricing: "Premium", commented: 54, reviewed: 15, status: "Approved", created_date: "31.01.2023"},
    {id: 13, info:{name: "Hieu", email: "Hieu@gmail.com"}, userName: "HieuNo1", pricing: "Cinematic", commented: 15, reviewed: 2, status: "Approved", created_date: "31.01.2023"},
    {id: 14, info:{name: "Nam", email: "Nam@gmail.com"}, userName: "Nam Poor", pricing: "Free", commented: 1, reviewed: 1, status: "Banned", created_date: "30.01.2023"}
];

function changeNameOfAdmin(firstName, lastName) {
    var name = document.getElementById("add-name-of-admin");
    name.innerText = firstName + " " + lastName;
};

function changeAdminName(data){
    changeNameOfAdmin(data.firstName, data.lastName);
};

function createButtonAction(){
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
    var a = document.createElement("a");
    a.href = "edit-user.html";
    a.className = "catalog__btn catalog__btn--edit";
    var svg_of_a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_of_a.setAttribute("viewBox", "0 0 24 24");
    var path_of_svg_a = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_of_svg_a.setAttribute("d", "M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z");
    svg_of_a.appendChild(path_of_svg_a);
    a.appendChild(svg_of_a);
    div.appendChild(a);
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

function createNewLine(id, info, userName, pricing, commented, reviewed, status, created_date){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var div1 = document.createElement("div");
    div1.className = "catalog__text";
    div1.textContent = id;
    td1.appendChild(div1);
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    var div2 = document.createElement("div");
    div2.className = "catalog__user";
    var div1_of_div2 = document.createElement("div");
    div1_of_div2.className = "catalog__avatar";
    var img = document.createElement("img");
    img.src = "img/user.svg";
    img.alt = "";
    div1_of_div2.appendChild(img);
    div2.appendChild(div1_of_div2);
    var div2_of_div2 = document.createElement("div");
    div2_of_div2.className = "catalog__meta";
    var h3 = document.createElement("h3");
    h3.textContent = info.name;
    div2_of_div2.appendChild(h3);
    var span_of_div2_of_div2 = document.createElement("span");
    span_of_div2_of_div2.textContent = info.email;
    div2_of_div2.appendChild(span_of_div2_of_div2);
    div2.appendChild(div2_of_div2);
    td2.appendChild(div2);
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    var div3 = document.createElement("div");
    div3.className = "catalog__text";
    div3.textContent = userName;
    td3.appendChild(div3);
    tr.appendChild(td3);
    var td4 = document.createElement("td");
    var div4 = document.createElement("div");
    div4.className = "catalog__text";
    div4.textContent = pricing;
    td4.appendChild(div4);
    tr.appendChild(td4);
    var td5 = document.createElement("td");
    var div5 = document.createElement("div");
    div5.className = "catalog__text";
    div5.textContent = commented;
    td5.appendChild(div5);
    tr.appendChild(td5);
    var td6 = document.createElement("td");
    var div6 = document.createElement("div");
    div6.className = "catalog__text";
    div6.textContent = reviewed;
    td6.appendChild(div6);
    tr.appendChild(td6);
    var td7 = document.createElement("td");
    var div7 = document.createElement("div");
    if (status === "Banned") {
        div7.className = "catalog__text catalog__text--red";
        div7.textContent = status;
    } else if (status === "Approved") {
        div7.className = "catalog__text catalog__text--green";
        div7.textContent = status;
    }
    td7.appendChild(div7);
    tr.appendChild(td7);
    var td8 = document.createElement("td");
    var div8 = document.createElement("div");
    div8.className = "catalog__text";
    div8.textContent = created_date;
    td8.appendChild(div8);
    tr.appendChild(td8);
    var td9 = document.createElement("td");
    var div9 = createButtonAction();
    td9.appendChild(div9);
    tr.appendChild(td9);
    return tr;
};

function add_data_for_user_table(dataset){
    var lists = document.getElementById("add-data-for-user-table");
    dataset.forEach(function(data){
        var list = createNewLine(data.id, data.info, data.userName, data.pricing, data.commented, data.reviewed, data.status, data.created_date);
        lists.appendChild(list);
    });
};

changeAdminName(Admin_Data);
add_data_for_user_table(User_Infomation_Data);