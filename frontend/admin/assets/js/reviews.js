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
  
  function generateReviews(items) {

    const catalogList = document.querySelector("tbody");

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


document.addEventListener('DOMContentLoaded',function(){
    generateReviews(reviews);
})