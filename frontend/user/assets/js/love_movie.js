const token = localStorage.getItem("token")

const wish_list = async() => {
    try{
        const response = await axios.get("http://localhost:8080/api/movies/favorite",
        {
            headers: { Authorization: `Bearer ${token}` },
        }
        )
        // console.log(response.data);
        addDataFilm(response.data, "wishlist")
    }
    catch(error){
        console.log(error);
    }
}

function createNewItemForFilm(id, cover_img_url, title, genres, average_rating) {
    let div = document.createElement("div");
    div.className = "col-6 col-sm-4 col-lg-3 col-xl-2";
    div.id = id;
    let div1 = document.createElement("div");
    div1.className = "item";
    let a = document.createElement("a");
    a.href = "#";
    a.className = "item__cover";
    let img = document.createElement("img");
    img.src = cover_img_url;
    img.alt = "";
    a.appendChild(img);
    let span = document.createElement("span");
    span.className = "item__play";
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span.appendChild(svg);
    a.appendChild(span);
    div1.appendChild(a);
    let div11 = document.createElement("div");
    div11.className = "item__content";
    let h3 = document.createElement("h3");
    h3.className = "item__title";
    let a_of_h3 = document.createElement("a");
    a_of_h3.href = "#";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div11.appendChild(h3);
    let span1_of_div11 = document.createElement("span");
    span1_of_div11.className = "item__category";
    let a_of_span = document.createElement("a");
    a_of_span.href = "#";
    a_of_span.textContent = genres;
    span1_of_div11.appendChild(a_of_span);
    div11.appendChild(span1_of_div11);
    let span2_of_div11 = document.createElement("span");
    span2_of_div11.className = "item__rate";
    span2_of_div11.textContent = average_rating;
    div11.appendChild(span2_of_div11);
    div1.appendChild(div11);
    div.appendChild(div1);
    return div;
};

// Hàm add data
function addDataFilm(dataset, id){
    let new_item = document.getElementById(id);
    dataset.forEach(function(data){
        let newLi = createNewItemForFilm(data.id, data.cover_img_url, data.title, data.genres, data.average_rating);
        new_item.appendChild(newLi);
    });
    // Thêm sự kiện click cho từng item trong các phần khác
    const movieItems2 = document.querySelectorAll('.col-6.col-sm-4.col-lg-3.col-xl-2');
    movieItems2.forEach(item => {
        item.addEventListener('click', (e) => {
            // Lấy ID của phim
            const movieId = item.getAttribute('id');
            
            // Chỉnh sửa localStorage và chuyển hướng trang
            localStorage.setItem('movieid', movieId);
            window.location.href = "http://localhost:3000/details";
        });
    });
};

document.addEventListener("DOMContentLoaded", function(){
    wish_list()
})