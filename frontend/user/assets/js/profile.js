var dataUsser = {
    id: 21313141,
    userName: "David Đặng",
    firstName: "Đặng",
    lastName: "David",
    email: "David@gmail.com",
    pricing: {name: "Premium", price: 19.99},
    commented: 2573,
    reviewed: 1021
};

var Recent_Views_Data = [
    {id: 1, title: "Echoes of Yesterday", catalog: "Action", rating: 8.4},
    {id: 2, title: "The Last Hope", catalog: "Animals", rating: 7.3},
    {id: 3, title: "The Edge of Tomorrow", catalog: "Sci-Fi", rating: 8.4},
    {id: 4, title: "A Light in the Darkness", catalog: "Drama", rating: 7.9},
    {id: 5, title: "Endless Horizon", catalog: "Trailer", rating: 8.4},
    {id: 6, title: "Beyond the Horizon", catalog: "Drama", rating: 7.1},
    {id: 7, title: "Reckoning", catalog: "Music", rating: 6.3},
    {id: 8, title: "Savage Beauty", catalog: "Comedy", rating: 7.9},
    {id: 9, title: "Echoes of the Past", catalog: "Fantasy", rating: 9.2}
];

var Latest_Reviews_Data = [
    {id: 1, item: "I Dream in Another Language", author: "Gene Graham", rating: 7.9},
    {id: 2, item: "The Forgotten Road", author: "Tess Harper", rating: 8.6},
    {id: 3, item: "Whitney", author: "Rosa Lee", rating: 6.1},
    {id: 4, item: "Red Sky at Night", author: "Matt Jones", rating: 9.1},
    {id: 5, item: "Into the Unknown", author: "Brian Cranston", rating: 5.5},
    {id: 6, item: "The Unseen Journey", author: "Louis Leterrier", rating: 7.7},
    {id: 7, item: "Savage Beauty", author: "Son Gun", rating: 9.5},
    {id: 8, item: "Endless Horizon", author: "Jordana Brewster", rating: 6.2},
    {id: 9, item: "The Lost Key", author: "Tyreese Gibson", rating: 8.6}
];

var Pricing_Plant_Data = [
    {name: "Normal", price: 4.99, list:["15 days", "1200p Resolution", "Desktop Only", "Limited Support"]},
    {name: "Premium", price: 19.99, list:["1 Months", "Full HD", "TV & Desktop", "24/7 Support"]},
    {name: "Cinematic", price: 39.99, list:["2 Months", "Ultra HD", "Any Device", "24/7 Support"]}
];

function changeUserInformation(userName, ID, pricing, commented, reviewed) {
    var newUserName = document.getElementById("user_name");
    newUserName.innerText = userName;
    var newUserID = document.getElementById("user_id");
    newUserID.innerText = "ID: "+ID;
    var newPricingName = document.getElementById("pricing_name_of_user");
    newPricingName.innerText = pricing.name + " plan";
    var newPricingPrice = document.getElementById("pricing_price_of_user");
    newPricingPrice.innerText = "$" + pricing.price;
    var newCommented = document.getElementById("commented_of_user");
    newCommented.innerText = commented;
    var newReviewed = document.getElementById("reviewed_of_user");
    newReviewed.innerText = reviewed;
};


function changeInformationOfUser(data) {
    changeUserInformation(data.userName, data.id, data.pricing, data.commented, data.reviewed);
};

function newLineOfRecentViews(id, title, catalog, rating){
    var tr = document.createElement("tr");
    var tdID = document.createElement("td");
    var divID = document.createElement("div");
    divID.className = "dashbox__table-text";
    divID.textContent = id;
    tdID.appendChild(divID);
    tr.appendChild(tdID);
    var tdTitle = document.createElement("td");
    var divTitle = document.createElement("div");
    divTitle.className = "dashbox__table-text";
    var a = document.createElement("a");
    a.href = "details1.html";
    a.textContent = title;
    divTitle.appendChild(a);
    tdTitle.appendChild(divTitle);
    tr.appendChild(tdTitle);
    var tdCatalog = document.createElement("td");
    var divCatalog = document.createElement("div");
    divCatalog.className = "dashbox__table-text";
    divCatalog.textContent = catalog;
    tdCatalog.appendChild(divCatalog);
    tr.appendChild(tdCatalog);
    var tdRating = document.createElement("td");
    var divRating = document.createElement("div");
    divRating.className = "dashbox__table-text dashbox__table-text--rate";
    divRating.textContent = rating;
    tdRating.appendChild(divRating);
    tr.appendChild(tdRating);
    return tr;
};

function addDataForRecentViews(dataset){
    var newLine = document.getElementById("add-data-for-recent-views");
    dataset.forEach(function(data){
        var line = newLineOfRecentViews(data.id, data.title, data.catalog, data.rating);
        newLine.appendChild(line);
    });
}

function newLineOfLatestReviews(id, item, author, rating){
    var tr = document.createElement("tr");
    var tdID = document.createElement("td");
    var divID = document.createElement("div");
    divID.className = "dashbox__table-text";
    divID.textContent = id;
    tdID.appendChild(divID);
    tr.appendChild(tdID);
    var tdItem = document.createElement("td");
    var divItem = document.createElement("div");
    divItem.className = "dashbox__table-text";
    var a = document.createElement("a");
    a.href = "details1.html";
    a.textContent = item;
    divItem.appendChild(a);
    tdItem.appendChild(divItem);
    tr.appendChild(tdItem);
    var tdAuthor = document.createElement("td");
    var divAuthor = document.createElement("div");
    divAuthor.className = "dashbox__table-text";
    divAuthor.textContent = author;
    tdAuthor.appendChild(divAuthor);
    tr.appendChild(tdAuthor);
    var tdRating = document.createElement("td");
    var divRating = document.createElement("div");
    divRating.className = "dashbox__table-text dashbox__table-text--rate";
    divRating.textContent = rating;
    tdRating.appendChild(divRating);
    tr.appendChild(tdRating);
    return tr;
};

function addDataForLatestReviews(dataset){
    var newList = document.getElementById("add-data-for-latest-reviews");
    dataset.forEach(function(data){
        var list = newLineOfLatestReviews(data.id, data.item, data.author, data.rating);
        newList.appendChild(list);
    });
};

function pricingPlantActive(name, price, list){
    var div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-4 order-md-3 order-lg-3";
    var div1 = document.createElement("div");
    div1.className = "plan";
    var h3 = document.createElement("h3");
    h3.className = "plan__title";
    h3.textContent = name;
    div1.appendChild(h3);
    var span = document.createElement("span");
    span.className = "plan__price";
    span.textContent = "$" + price;
    div1.appendChild(span);
    var ul = document.createElement("ul");
    ul.className = "plan__list";
    list.forEach(function(temp){
        var li = document.createElement("li");
        li.textContent = temp;
        ul.appendChild(li);
    });
    div1.appendChild(ul);
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "modal");
    button.className = "plan__btn";
    button.setAttribute("data-bs-target", "#plan-modal");
    var span_of_button = document.createElement("span");
    span_of_button.textContent = "Choose plan";
    button.appendChild(span_of_button);
    div1.appendChild(button);
    div.appendChild(div1);
    return div;
};

function pricingPlantPremiun(name, price, list){
    var div = document.createElement("div");
    div.className = "col-12 col-lg-4 order-md-1 order-lg-2";
    var div1 = document.createElement("div");
    div1.className = "plan plan--premium";
    var h3 = document.createElement("h3");
    h3.className = "plan__title";
    h3.textContent = name;
    div1.appendChild(h3);
    var span = document.createElement("span");
    span.className = "plan__price";
    span.textContent = "$" + price;
    div1.appendChild(span);
    var ul = document.createElement("ul");
    ul.className = "plan__list";
    list.forEach(function(temp){
        var li = document.createElement("li");
        li.textContent = temp;
        ul.appendChild(li);
    });
    div1.appendChild(ul);
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "modal");
    button.className = "plan__btn";
    button.setAttribute("data-bs-target", "#plan-modal");
    var span_of_button = document.createElement("span");
    span_of_button.textContent = "Choose plan";
    button.appendChild(span_of_button);
    div1.appendChild(button);
    div.appendChild(div1);
    return div;
};

function addDataPricingPlant(dataset) {
    var plants = document.getElementById("add-data-pricing-plant");
    var normal = pricingPlantActive(dataset[0].name, dataset[0].price, dataset[0].list);
    plants.appendChild(normal);
    var premium = pricingPlantPremiun(dataset[1].name, dataset[1].price, dataset[1].list);
    plants.appendChild(premium);
    var active = pricingPlantActive(dataset[2].name, dataset[2].price, dataset[2].list);
    plants.append(active);
};

function changeSettingInfomation(userName, firstName, lastName, email){
    var UserName = document.getElementById("username");
    UserName.placeholder = userName;
    var FirstName = document.getElementById("firstname");
    FirstName.placeholder = firstName;
    var LastName = document.getElementById("lastname");
    LastName.placeholder = lastName;
    var Email = document.getElementById("email2");
    Email.placeholder = email;
};

function changeInformationInSetting(data){
    changeSettingInfomation(data.userName, data.firstName, data.lastName, data.email);
};

changeInformationOfUser(dataUsser);
addDataForRecentViews(Recent_Views_Data);
addDataForLatestReviews(Latest_Reviews_Data);
addDataPricingPlant(Pricing_Plant_Data);
changeInformationInSetting(dataUsser);