let user_id = 0
const token = localStorage.getItem('token');
const today = new Date();
const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
expire = ""
let had_plan = false

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/profile',
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        console.log(response.data);
        let user_info = response.data.user[0];
        let username = user_info.first_name + " " + user_info.last_name;
        if(username == 0){
            username = "Undefined";
        }
        let pricing_plan = response.data.plan
        if(pricing_plan.length === 0){
            pricing_plan = {name: "No Pricing Plan", price: 0}
        }
        user_id = (response.data.user[0].id);
        changeUserInformation(username, user_info.id, response.data.plan[0].name, 
        response.data.numberOfComments, response.data.numberOfRatings)

        let recent_views = response.data.recentMovies.slice(0,10)
        addDataForRecentViews(recent_views);

        let recent_rating = response.data.recentRatings.slice(0,10)
        // console.log(response.data.recentRatings);
        addDataForLatestReviews(recent_rating);

        changeSettingInfomation(user_info.first_name, user_info.last_name, user_info.email);

        const plan = await axios.get(`http://localhost:8080/api/plans`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        addDataPricingPlant(plan.data.planDatas);
        let expire_date = new Date(plan.data.userPlan[0].exp_date)
        expire = plan.data.userPlan[0].exp_date
        console.log(expire);
        if(expire_date >= endOfToday){
            pricingPlantActive(plan.data.userPlan[0].id);
            had_plan = true
        }
    } catch (error) {
        showCustomAlert(error.response.data.message);
    }
};

function changeUserInformation(userName, ID, pricing_plan, commented, reviewed) {
    var newUserName = document.getElementById("user_name");
    newUserName.innerText = userName;
    var newUserID = document.getElementById("user_id");
    newUserID.innerText = "ID: "+ID;
    var newPricingName = document.getElementById("pricing_name_of_user");
    newPricingName.innerText = pricing_plan;
    // var newPricingPrice = document.getElementById("pricing_price_of_user");
    // newPricingPrice.innerText = "$" + pricing.price;
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
        var list = newLineOfLatestReviews(data.movie_id, data.movie_title, data.avg_rating, data.value);
        newList.appendChild(list);
    });
};


function pricingPlantActive(id){
    planid = "plan" + id
    // console.log("access to current plan: ", planid);
    let current_plan = document.getElementById(planid)
    current_plan.textContent = "Current Plan";
    let status = current_plan.closest(".plan.plan--premium")
    status.classList.remove("plan--premium");
    status.classList.add("plan--active");
};

function pricingPlantPremiun(name, price,resolution,duration, list, id){
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
    span.textContent =  "$" + price ;
    div1.appendChild(span);
    var ul = document.createElement("ul");
    ul.className = "plan__list";
    var li1 = document.createElement("li");
    li1.textContent = duration + " days";
    ul.appendChild(li1);
    var li2 = document.createElement("li");
    li2.textContent = resolution;
    ul.appendChild(li2);

    let str = list;
        let words = str.split(/[\n-]/).filter(word => word.trim() !== '');
    words.forEach((word) => {
        var li = document.createElement("li");
        li.textContent = word;
        ul.appendChild(li);
    })
    // list.forEach(function(temp){
    //     var li = document.createElement("li");
    //     li.textContent = temp;
    //     ul.appendChild(li);
    // });
    div1.appendChild(ul);
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "modal");
    button.className = "plan__btn";
    button.setAttribute("data-bs-target", "#plan-modal");
    var span_of_button = document.createElement("span");
    span_of_button.textContent = "Choose plan";
    plan_id = "plan" + id
    console.log(plan_id);
    span_of_button.setAttribute("id", plan_id);
    button.appendChild(span_of_button);
    div1.appendChild(button);
    div.appendChild(div1);
    return div;
};

function addDataPricingPlant(dataset) {
    let plants = document.getElementById("add-data-pricing-plant");
    let starter = pricingPlantPremiun(dataset[0].name, dataset[0].price,dataset[0].film_quality, dataset[0].duration, dataset[0].description, dataset[0].id);
    plants.appendChild(starter);
    let premium = pricingPlantPremiun(dataset[1].name, dataset[1].price,dataset[1].film_quality, dataset[1].duration, dataset[1].description, dataset[1].id);
    plants.appendChild(premium);
    let ultimate = pricingPlantPremiun(dataset[2].name, dataset[2].price,dataset[2].film_quality, dataset[2].duration, dataset[2].description, dataset[2].id);
    plants.appendChild(ultimate);
    let cinematic = pricingPlantPremiun(dataset[3].name, dataset[3].price,dataset[3].film_quality, dataset[3].duration, dataset[3].description, dataset[3].id);
    plants.append(cinematic);
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
        console.log(user_id);
        console.log(firstNameInput.value);
        console.log(lastNameInput.value);
        console.log(emailInput.value);
        const response = await axios.put(`http://localhost:8080/api/profile`,
        {"firstName": firstNameInput.value, "lastName": lastNameInput.value, "email": emailInput.value},
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log(response);
        showCustomAlert("Profile changed successfully")
    }
    catch(error){
        showCustomAlert(error.response.data.message);
    }
}

const change_button = document.getElementById("change_button");
const oldpass = document.getElementById("oldpass");
const newpass = document.getElementById("newpass");
const confirmpass = document.getElementById("confirmpass");

const changePassword = async() => {
    try{
        const response = await axios.post(`http://localhost:8080/api/password/change`,
            {"oldPassword": oldpass.value, "newPassword": newpass.value},
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        showCustomAlert("Password changed successfully");
        // window.location.reload();
    }
    catch(error){
        showCustomAlert(error.response.data.message);
    }
}

const purchase = async(id, payment_method) =>{
    try{
        console.log({"planId": id, "paymentMethod": payment_method})
        console.log("buying");
        const response =  await axios.post(`http://localhost:8080/api/plans`,
        {"planId": id, "paymentMethod": payment_method},
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        window.location.reload();
    }
    catch(error){
        showCustomAlert(error.response.data.message);
    }
}

const buy_plan = document.querySelector(".sign__btn.sign__btn--modal")


document.addEventListener("DOMContentLoaded", function(){
    fetchData();
    save_button.addEventListener("click", function(){
        if(emailInput.value.trim()== "" || firstNameInput.value.trim() == "" || lastNameInput.value.trim() == ""){
            showCustomAlert("Please fill all value");
            return
        }
        if(!isValidGmail(emailInput.value)){
            showCustomAlert("Incorrect gmail syntax")
            return
        }
        changeProfile();
    })
    change_button.addEventListener("click", function(){
        if(oldpass.value.trim()== "" || newpass.value.trim() == "" || confirmpass.value.trim() == ""){
            showCustomAlert("Please fill all value");
            return
        }
        if(newpass.value.trim() != confirmpass.value.trim()){
            showCustomAlert("New password and Confirmation password are not identical")
            return
        }
        changePassword()
        oldpass.value = ""
        newpass.value = ""
        confirmpass.value = ""
    })
    buy_plan.addEventListener("click",function(){
        if(had_plan){
            showCustomAlert("Your plan has not expired yet! Expire date is: " + expire.slice(0,10))
            return
        }
        let option = document.getElementById("value")
        let selected = option.value
        let selectedValueInt = parseInt(selected, 10);
        let payment_method = document.querySelectorAll('input[name="type"]')
        let saved_method = ""
        payment_method.forEach((method) => {
            if(method.checked) {
                let label = method.nextElementSibling;
                saved_method = label.textContent
            }
        })
        purchase(selectedValueInt, saved_method)
    })
});