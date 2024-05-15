const token = localStorage.getItem('token');
const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/profile',
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        let user_info = response.data.profile.user[0];
        let username = user_info.first_name + user_info.last_name;
        if(username == 0){
            username = "Undefined";
        }
        let pricing_plan = response.data.profile.plan
        if(pricing_plan.length === 0){
            pricing_plan = {name: "No Pricing Plan", price: 0}
        }
        console.log(response.data);
        changeUserInformation(username, user_info.id, {name: "Premium", price: 19.99}, 
        response.data.profile.numberOfComments, response.data.profile.numberOfRatings)

        let recent_views = response.data.profile.recentMovies.movies.slice(0,10)
        addDataForRecentViews(recent_views);

        let recent_rating = response.data.profile.recentRatings.slice(0,10)
        addDataForLatestReviews(recent_rating);

        changeSettingInfomation(user_info.first_name, user_info.last_name, "example@gmail.com");
    } catch (error) {
        console.log(error);
    }
};

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
    a.href = "#";
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
        var line = newLineOfRecentViews(data.id, data.title, data.genres, data.average_rating);
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
    a.href = "#";
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
        var list = newLineOfLatestReviews(data.id, data.title, data.average_rating, data.user_rating);
        newList.appendChild(list);
    });
};

var Pricing_Plant_Data = [
    {name: "Ultimate", price: "29.99$", list:["2 months", "2k Resolution", "Any Device", "24/7 Support"]},
    {name: "Premium", price: "19.99$", list:["1 Months", "1080p Resolution", "TV & Desktop", "24/7 Support"]},
    {name: "Cinematic", price: "39.99$", list:["2 Months", "4k Resolution", "Any Device", "24/7 Support"]},
    {name: "Starter", price: "Free", list:["2 months", "720p Resolution", "Desktop Only", "Limited Support"]},
];

function pricingPlantActive(name){
    let current_plan = document.getElementById(name)
    current_plan.textContent = "Current Plan";
    let status = current_plan.closest(".plan.plan--premium")
    status.classList.remove("plan--premium");
    status.classList.add("plan--active");
};

function pricingPlantPremiun(name, price, list){
    var div = document.createElement("div");
    div.className = "col-12 col-lg-3 order-md-1 order-lg-2";
    var div1 = document.createElement("div");
    div1.className = "plan plan--premium";
    var h3 = document.createElement("h3");
    h3.className = "plan__title";
    h3.textContent = name;
    div1.appendChild(h3);
    var span = document.createElement("span");
    span.className = "plan__price";
    span.textContent =  price;
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
    span_of_button.setAttribute("id", name);
    button.appendChild(span_of_button);
    div1.appendChild(button);
    div.appendChild(div1);
    return div;
};

function addDataPricingPlant(dataset) {
    let plants = document.getElementById("add-data-pricing-plant");
    let starter = pricingPlantPremiun(dataset[3].name, dataset[3].price, dataset[3].list);
    plants.appendChild(starter);
    let normal = pricingPlantPremiun(dataset[0].name, dataset[0].price, dataset[0].list);
    plants.appendChild(normal);
    let premium = pricingPlantPremiun(dataset[1].name, dataset[1].price, dataset[1].list);
    plants.appendChild(premium);
    let active = pricingPlantPremiun(dataset[2].name, dataset[2].price, dataset[2].list);
    plants.append(active);
};

function changeSettingInfomation(firstName, lastName, email){
    var FirstName = document.getElementById("firstname");
    FirstName.placeholder = firstName;
    var LastName = document.getElementById("lastname");
    LastName.placeholder = lastName;
    var Email = document.getElementById("email2");
    Email.placeholder = email;
};

const save_button = document.getElementById("save_button");
const emailInput = document.getElementById('email2');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');

function isValidGmail(email) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng của email
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return gmailRegex.test(email);
}

const changeProfile = async() => {
    try{
        console.log(firstNameInput.value);
        console.log(lastNameInput.value);
        console.log(emailInput.value);
        const response = await axios.put(`http://localhost:8080/api/profile`,
        {"firstName": firstNameInput.value, "lastName": lastNameInput.value, "email": "johndoe@gmail.com"},
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
}

const change_button = document.getElementById("change_button");
const oldpass = document.getElementById("oldpass");
const newpass = document.getElementById("newpass");
const confirmpass = document.getElementById("confirmpass");

const changePassword = async() => {
    try{
        const response = await axios.put(`http://localhost:8080/api/password`,
            {"oldPassword": oldpass.value, "newPassword": newpass.value},
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    addDataPricingPlant(Pricing_Plant_Data);
    pricingPlantActive("Starter");
    fetchData();
    save_button.addEventListener("click", function(){
        if(emailInput.value.trim()== "" || firstNameInput.value.trim() == "" || lastNameInput.value.trim() == ""){
            alert("Please fill all value");
            return
        }
        if(!isValidGmail(emailInput.value)){
            alert("Incorrect gmail syntax")
            return
        }
        changeProfile();
    })
    change_button.addEventListener("click", function(){
        if(oldpass.value.trim()== "" || newpass.value.trim() == "" || confirmpass.value.trim() == ""){
            alert("Please fill all value");
            return
        }
        if(newpass.value.trim() != confirmpass.value.trim()){
            alert("New password and Confirmation password are not identical")
            return
        }
        changePassword()
    })
});