const comments = [
    {
        "number": "11",
        "title": "lạc lối giữa dòng đời",
        "actor": "Charlize Theron",
        "description": "When a renowned archaeologist goes...",
        "date": "05.02.2023"
    },
    {
        "number": "12",
        "title": "The Forgotten Road",
        "actor": "Tyreese Gibson",
        "description": "A down-on-his-luck boxer struggles...",
        "date": "05.02.2023"
    },
    {
        "number": "13",
        "title": "Whitney",
        "actor": "Jordana Brewster",
        "description": "When an old friend offers him...",
        "date": "04.02.2023"
    },
    {
        "number": "14",
        "title": "Red Sky at Night",
        "actor": "Son Gun",
        "description": "But as the stakes get higher...",
        "date": "04.02.2023"
    },
    {
        "number": "15",
        "title": "Into the Unknown",
        "actor": "Louis Leterrier",
        "description": "A brilliant scientist discovers...",
        "date": "04.02.2023"
    },
    {
        "number": "16",
        "title": "The Unseen Journey",
        "actor": "Brian Cranston",
        "description": "But when her groundbreaking...",
        "date": "03.02.2023"
    },
    {
        "number": "17",
        "title": "Savage Beauty",
        "actor": "Matt Jones",
        "description": "Along the way, she must...",
        "date": "03.02.2023"
    },
    {
        "number": "18",
        "title": "Endless Horizon",
        "actor": "Rosa Lee",
        "description": "Renewable energy source...",
        "date": "02.02.2023"
    },
    {
        "number": "19",
        "title": "The Lost Key",
        "actor": "Tess Harper",
        "description": "Confront her own past to save...",
        "date": "02.02.2023"
    },
    {
        "number": "20",
        "title": "Echoes of Yesterday",
        "actor": "Gene Graham",
        "description": "Her father and uncover the secrets...",
        "date": "01.02.2023"
    }
]

const reviews = [
    {
      "id": 11,
      "title": "Chạm đáy nỗi đau",
      "director": "Gene Graham",
      "description": "Her father and uncover the secrets...",
      "rating": 7.9,
      "release_date": "06.02.2023"
    },
    {
      "id": 12,
      "title": "The Forgotten Road",
      "director": "Tess Harper",
      "description": "Confront her own past to save...",
      "rating": 8.6,
      "release_date": "06.02.2023"
    },
    {
      "id": 13,
      "title": "Whitney",
      "director": "Rosa Lee",
      "description": "Renewable energy source...",
      "rating": 6.0,
      "release_date": "05.02.2023"
    },
    {
      "id": 14,
      "title": "Red Sky at Night",
      "director": "Matt Jones",
      "description": "Along the way, she must...",
      "rating": 9.1,
      "release_date": "05.02.2023"
    },
    {
      "id": 15,
      "title": "Into the Unknown",
      "director": "Brian Cranston",
      "description": "But when her groundbreaking...",
      "rating": 5.5,
      "release_date": "05.02.2023"
    },
    {
      "id": 16,
      "title": "The Unseen Journey",
      "director": "Louis Leterrier",
      "description": "A brilliant scientist discovers...",
      "rating": 7.0,
      "release_date": "04.02.2023"
    },
    {
      "id": 17,
      "title": "Savage Beauty",
      "director": "Son Gun",
      "description": "But as the stakes get higher...",
      "rating": 9.0,
      "release_date": "04.02.2023"
    },
    {
      "id": 18,
      "title": "Endless Horizon",
      "director": "Jordana Brewster",
      "description": "When an old friend offers him...",
      "rating": 6.2,
      "release_date": "03.02.2023"
    },
    {
      "id": 19,
      "title": "The Lost Key",
      "director": "Tyreese Gibson",
      "description": "A down-on-his-luck boxer struggles...",
      "rating": 7.9,
      "release_date": "02.02.2023"
    },
    {
      "id": 20,
      "title": "Echoes of Yesterday",
      "director": "Charlize Theron",
      "description": "When a renowned archaeologist goes...",
      "rating": 8.6,
      "release_date": "02.02.2023"
    }
]

function changeAdminName(data){
  var name = document.getElementById("add-name-of-admin");
  name.innerText = data.first_name + " " + data.last_name;
};

function generateComments(items) {
    const catalogList = document.querySelector("#body1");

    items.forEach(item => {
        // Tạo phần tử <tr>
        const catalogItem = document.createElement("tr");

        // Tạo phần tử <td> chứa số thứ tự
        const numberCell = document.createElement("td");
        const numberDiv = document.createElement("div");
        numberDiv.classList.add("catalog__text");
        numberDiv.textContent = item.number;
        numberCell.appendChild(numberDiv);

        // Tạo phần tử <td> chứa tiêu đề phim
        const titleCell = document.createElement("td");
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("catalog__text");
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", "#");
        titleLink.textContent = item.title;
        titleDiv.appendChild(titleLink);
        titleCell.appendChild(titleDiv);

        // Tạo phần tử <td> chứa tên diễn viên
        const actorCell = document.createElement("td");
        const actorDiv = document.createElement("div");
        actorDiv.classList.add("catalog__text");
        actorDiv.textContent = item.actor;
        actorCell.appendChild(actorDiv);

        // Tạo phần tử <td> chứa mô tả phim
        const descriptionCell = document.createElement("td");
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("catalog__text");
        descriptionDiv.textContent = item.description;
        descriptionCell.appendChild(descriptionDiv);

        // Tạo phần tử <td> chứa ngày công chiếu
        const dateCell = document.createElement("td");
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("catalog__text");
        dateDiv.textContent = item.date;
        dateCell.appendChild(dateDiv);

        // Tạo phần tử <td> chứa các nút thao tác
        const actionCell = document.createElement("td");
        const actionDiv = document.createElement("div");
        actionDiv.classList.add("catalog__btns");

        const viewButton = document.createElement("button");
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("data-bs-toggle", "modal");
        viewButton.classList.add("catalog__btn", "catalog__btn--view");
        viewButton.setAttribute("data-bs-target", "#modal-view");
        viewButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>`;

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.classList.add("catalog__btn", "catalog__btn--delete");
        deleteButton.setAttribute("data-bs-target", "#modal-delete");
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>`;

        actionDiv.appendChild(viewButton);
        actionDiv.appendChild(deleteButton);
        actionCell.appendChild(actionDiv);

        // Thêm các phần tử vào phần tử <tr>
        catalogItem.appendChild(numberCell);
        catalogItem.appendChild(titleCell);
        catalogItem.appendChild(actorCell);
        catalogItem.appendChild(descriptionCell);
        catalogItem.appendChild(dateCell);
        catalogItem.appendChild(actionCell);

        // Thêm phần tử <tr> vào danh sách
        catalogList.appendChild(catalogItem);
    });
}

function generateReviews(items) {

    const catalogList = document.querySelector("#body2");

    items.forEach(item => {
        // Tạo phần tử <tr>
    const catalogItem = document.createElement("tr");

    // Tạo phần tử <td> chứa số thứ tự
    const numberCell = document.createElement("td");
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("catalog__text");
    numberDiv.textContent = item.id;
    numberCell.appendChild(numberDiv);
    catalogItem.appendChild(numberCell);

    // Tạo phần tử <td> chứa tiêu đề phim
    const titleCell = document.createElement("td");
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("catalog__text");
    const titleLink = document.createElement("a");
    titleLink.setAttribute("href", "#");
    titleLink.textContent = item.title;
    titleDiv.appendChild(titleLink);
    titleCell.appendChild(titleDiv);
    catalogItem.appendChild(titleCell);

    // Tạo phần tử <td> chứa tên diễn viên
    const actorCell = document.createElement("td");
    const actorDiv = document.createElement("div");
    actorDiv.classList.add("catalog__text");
    actorDiv.textContent = item.director;
    actorCell.appendChild(actorDiv);
    catalogItem.appendChild(actorCell);

    // Tạo phần tử <td> chứa mô tả phim
    const descriptionCell = document.createElement("td");
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("catalog__text");
    descriptionDiv.textContent = item.description;
    descriptionCell.appendChild(descriptionDiv);
    catalogItem.appendChild(descriptionCell);

    // Tạo phần tử <td> chứa rating
    const ratingCell = document.createElement("td");
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("catalog__text", "catalog__text--rate");
    ratingDiv.textContent = item.rating;
    ratingCell.appendChild(ratingDiv);
    catalogItem.appendChild(ratingCell);

    // Tạo phần tử <td> chứa ngày công chiếu
    const dateCell = document.createElement("td");
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("catalog__text");
    dateDiv.textContent = item.release_date;
    dateCell.appendChild(dateDiv);
    catalogItem.appendChild(dateCell);

    // Tạo phần tử <td> chứa các nút thao tác
    const actionCell = document.createElement("td");
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("catalog__btns");

    const viewButton = document.createElement("button");
    viewButton.setAttribute("type", "button");
    viewButton.setAttribute("data-bs-toggle", "modal");
    viewButton.classList.add("catalog__btn", "catalog__btn--view");
    viewButton.setAttribute("data-bs-target", "#modal-view");
    viewButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>`;

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("data-bs-toggle", "modal");
    deleteButton.classList.add("catalog__btn", "catalog__btn--delete");
    deleteButton.setAttribute("data-bs-target", "#modal-delete");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>`;

    actionDiv.appendChild(viewButton);
    actionDiv.appendChild(deleteButton);
    actionCell.appendChild(actionDiv);
    catalogItem.appendChild(actionCell);

    catalogList.appendChild(catalogItem);
    });
}

function changeUserInfomation(){
    const change_color = document.getElementById("change_color");
    let changeUserName = change_color.querySelector("h3");
    let userId = document.getElementById("changeUserId");
    let UserName = document.getElementsByClassName("changeUserName")[0];
    let Email = document.getElementsByClassName("changeEmail")[0];
    let FirstName = document.getElementsByClassName("changeFirstName")[0];
    let LastName = document.getElementsByClassName("changeLastName")[0];
    const id = sessionStorage.getItem("checkUserId");
    axios.get(`http://localhost:8080/api/profile?userId=${id}`,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token_admin')}`}
      }
    ).then(response => {
        let data = response.data.user[0];
        // console.log(data);
        changeUserName.textContent = data.first_name + " " + data.last_name;
        let userStatus = document.createElement("span");
        if(data.status === "accepted"){
            change_color.className = "profile__meta profile__meta--green";
        }else if(data.status === "banned"){
            change_color.className = "profile__meta profile__meta--red";
        };
        userStatus.textContent = '('+data.status.toUpperCase()+')';
        // console.log(userStatus.textContent);
        changeUserName.appendChild(userStatus);
        userId.textContent = "User ID: "+data.id;
        UserName.textContent = data.username;
        Email.textContent = data.email;
        FirstName.textContent = data.first_name;
        LastName.textContent = data.last_name;
    });
    const statusButton = document.getElementById("statusButton");      
    const ApplyButton = document.getElementById("ApplyButton");
    ApplyButton.addEventListener("click", function(){
      const status = changeUserName.querySelector("span");
      if(status.textContent === "(ACCEPTED)"){
        status.textContent = "(BANNED)";
        change_color.className = "profile__meta profile__meta--red";
      }else if(status.textContent === "(BANNED)"){
          status.textContent = "(ACCEPTED)";
          change_color.className = "profile__meta profile__meta--green";
      }
      var test = "banned";
      if (status.textContent === "(ACCEPTED)"){
          test = "accepted";
      } else if (status.textContent === "(BANNED)"){
          test = "banned";
      };
      // console.log(test);
      axios.put(`http://localhost:8080/api/admin/user_manage/change_status/${id}`,
        {
          status: test
        },
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token_admin')}`}
        }
      ).then(response => {
          showCustomAlert("Change status successfully (.^_^.)"); 
      }).catch(error => {
          showCustomAlert("Change status failed (T_T)");
      });
    });
};

function changeUserPlan(){
  const save_button = document.getElementById("save_button");
  const id = sessionStorage.getItem("checkUserId");
  save_button.addEventListener("click", function(){
    const subscription = document.getElementById("subscription").value;
    axios.put(`http://localhost:8080/api/admin/user_manage/change_plan/${id}`,
      {
        planId: subscription
      },
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token_admin')}`}
      }
    ).then(response => {
        showCustomAlert("Change plan successfully (.^_^.)"); 
    }).catch(error => {
        showCustomAlert("Change plan failed (T_T)");
    });
  });

};

document.addEventListener("DOMContentLoaded", function(){
    // generateComments(comments);
    // generateReviews(reviews);
    axios.get('http://localhost:8080/api/profile', 
        {
            headers: {Authorization: `Bearer ${localStorage.getItem('token_admin')}`}
        }
    ).then(response => {
        const data = response.data.user[0];
        changeAdminName(data);
      }).catch(error => {
        showCustomAlert(error.response.data.message);
      });
    changeUserInfomation();
    changeUserPlan();
})