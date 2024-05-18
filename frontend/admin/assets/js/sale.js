const admin_token = localStorage.getItem("token_admin")
const display_total = document.querySelector(".main__title-stat")
let all_transactions = []
let total_sales = 0

const sale = async() => {
    try{
        const response = await axios.get(`http://localhost:8080/api/admin/sale`,
        {
            headers: {Authorization: `Bearer ${admin_token}`}
        }
        )
        console.log(response.data.data);
        generateSales(response.data.data)
        display_total.textContent = total_sales.toFixed(2) + "$"
        all_transactions = response.data.data
    }
    catch(error){
        console.log(error);
    }
}


function generateSales(items) {
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

        // Tạo phần tử <td> chứa tiêu đề phim
        const titleCell = document.createElement("td");
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("catalog__text");
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", "#");
        titleLink.textContent = item.username;
        titleDiv.appendChild(titleLink);
        titleCell.appendChild(titleDiv);

        // Tạo phần tử <td> chứa tên diễn viên
        const actorCell = document.createElement("td");
        const actorDiv = document.createElement("div");
        actorDiv.classList.add("catalog__text");
        actorDiv.textContent = item.plan;
        actorCell.appendChild(actorDiv);

        // Tạo phần tử <td> chứa mô tả phim
        const descriptionCell = document.createElement("td");
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("catalog__text");
        total_sales += parseFloat(item.amount)
        descriptionDiv.textContent = item.amount;
        descriptionCell.appendChild(descriptionDiv);

        // Tạo phần tử <td> chứa ngày công chiếu
        const dateCell = document.createElement("td");
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("catalog__text");
        dateDiv.textContent = item.purchase_date.slice(0,10)
        dateCell.appendChild(dateDiv);

        // Tạo phần tử <td> chứa các nút thao tác
        const actionCell = document.createElement("td");
        const actionDiv = document.createElement("div");
        actionDiv.classList.add("catalog__text");
        actionDiv.textContent = item.purchase_method;

        // const viewButton = document.createElement("button");
        // viewButton.setAttribute("type", "button");
        // viewButton.setAttribute("data-bs-toggle", "modal");
        // viewButton.classList.add("catalog__btn", "catalog__btn--view");
        // viewButton.setAttribute("data-bs-target", "#modal-view");
        // viewButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>`;

        // const deleteButton = document.createElement("button");
        // deleteButton.setAttribute("type", "button");
        // deleteButton.setAttribute("data-bs-toggle", "modal");
        // deleteButton.classList.add("catalog__btn", "catalog__btn--delete");
        // deleteButton.setAttribute("data-bs-target", "#modal-delete");
        // deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>`;

        // actionDiv.appendChild(viewButton);
        // actionDiv.appendChild(deleteButton);
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

function calculateRevenue(transactions, startDate, endDate) {
    return transactions
        .filter(transaction => {
            const date = new Date(transaction.purchase_date);
            return date >= startDate && date <= endDate;
        })
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
}


const today = new Date();
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
// console.log(startOfToday, endOfToday);

const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - 7);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(today);
endOfWeek.setHours(23, 59, 59, 999);
// console.log(startOfWeek, endOfWeek);

// Lấy 30 ngày trước
const startOfMonth = new Date(today);
startOfMonth.setDate(today.getDate() - 30);
startOfMonth.setHours(0, 0, 0, 0);

const endOfMonth = new Date(today);
endOfMonth.setHours(23, 59, 59, 999);
// console.log(startOfMonth, endOfMonth);

const filterSelect = document.getElementById('filter__sort');

document.addEventListener('DOMContentLoaded',function(){
    sale()
    filterSelect.addEventListener("change", function(){
        let selectedValue = this.value;
        if(selectedValue == 0){
            display_total.textContent = total_sales.toFixed(2) + "$"
            console.log("changed option");
        }
        else if(selectedValue == 1){
            let sales = calculateRevenue(all_transactions, startOfToday, endOfToday)
            display_total.textContent = sales.toFixed(2) + "$"
            console.log("changed option");
        }
        else if(selectedValue == 2){
            let sales = calculateRevenue(all_transactions, startOfWeek, endOfWeek)
            display_total.textContent = sales.toFixed(2) + "$"
            console.log("changed option");
        }
        else{
            let sales = calculateRevenue(all_transactions, startOfMonth, endOfMonth)
            display_total.textContent = sales.toFixed(2) + "$"
            console.log("changed option");
        }
    })
})