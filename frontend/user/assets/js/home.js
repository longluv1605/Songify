// Hàm add data cho phần new item of this season
function UpdateNewItemOfThisSeason(data){
    // Lấy danh sách các phần tử <li> trong danh sách <ul>
    const ulElement = document.querySelector('.splide__list');
    const liElements = ulElement.querySelectorAll('.splide__slide');

    // Lặp qua từng phần tử <li> và xử lý
    liElements.forEach((li, index) => {
        if(index<=9) {
            const div = li.querySelector('.item.item--big');
            div.id = data[index].id;
            const img = li.querySelector('img');
            img.src = data[index].cover_img_url;
            const title = li.querySelector('h3');
            title.textContent = data[index].title;
            const span = li.querySelector('.item__category');
            const genre = span.querySelector('a');
            genre.textContent = data[index].genres;
            const rating = li.querySelector('.item__rate');
            rating.textContent = data[index].average_rating;
        } else if (index>=10 && index<=19) {
            const div = li.querySelector('.item.item--big');
            div.id = data[index-10].id;
            const img = li.querySelector('img');
            img.src = data[index-10].cover_img_url;
            const title = li.querySelector('h3');
            title.textContent = data[index-10].title;
            const span = li.querySelector('.item__category');
            const genre = span.querySelector('a');
            genre.textContent = data[index-10].genres;
            const rating = li.querySelector('.item__rate');
            rating.textContent = data[index-10].average_rating;
        } else if (index>=20) {
            const div = li.querySelector('.item.item--big');
            div.id = data[index-20].id;
            const img = li.querySelector('img');
            img.src = data[index-20].cover_img_url;
            const title = li.querySelector('h3');
            title.textContent = data[index-20].title;
            const span = li.querySelector('.item__category');
            const genre = span.querySelector('a');
            genre.textContent = data[index-20].genres;
            const rating = li.querySelector('.item__rate');
            rating.textContent = data[index-20].average_rating;
        }
        // console.log(li);
    });
};

var dataNewItem = [
    {img: "img/covers/1.png", title: "The Lost City", catalogs: "Action, Trailer", rating: 8.4, movie_quality: "HD", limited_age: 16, description: "When a renowned archaeologist goes missing, his daughter sets out on a perilous journey to the heart of the Amazon rainforest to find him. Along the way, she discovers a hidden city and a dangerous conspiracy that threatens the very balance of power in the world. With the help of a charming rogue, she must navigate treacherous terrain and outwit powerful enemies to save her father and uncover the secrets of the lost city."},
    {img: "img/covers/2.png", title: "Undercurrents", catalogs: "Comedy", rating: 7.1, movie_quality: "FHD", limited_age: 18, description: "A brilliant scientist discovers a way to harness the power of the ocean's currents to create a new, renewable energy source. But when her groundbreaking technology falls into the wrong hands, she must race against time to stop it from being used for evil. Along the way, she must navigate complex political alliances and confront her own past to save the world from disaster."},
    {img: "img/covers/3.png", title: "Redemption Road", catalogs: "Romance, Drama, Music", rating: 6.3, movie_quality: "HD", limited_age: 12, description: "A down-on-his-luck boxer struggles to make ends meet while raising his young son. When an old friend offers him a chance to make some quick cash by fighting in an illegal underground boxing tournament, he sees it as his last shot at redemption. But as the stakes get higher and the fights get more brutal, he must confront his own demons and find the strength to win not just for himself, but for his son."},
    {img: "img/covers/4.png", title: "Tales from the Underworld", catalogs: "Comedy, Drama", rating: 7.9, movie_quality: "HD", limited_age: 16, description: "When a luxury cruise ship sets sail on its final voyage before retirement, the passengers and crew expect nothing but relaxation and indulgence. But when a mysterious illness spreads through the ship, they find themselves fighting for survival in the middle of the ocean. As tensions rise and resources dwindle, they must confront their own mortality and make impossible choices to stay alive."},
    {img: "img/covers/5.png", title: "Voices from the Other Side", catalogs: "Action, Trailer", rating: 8.4, movie_quality: "HD", limited_age: 12, description: "In a world where magic is outlawed and hunted, a young witch must use her powers to fight back against the corrupt authorities who seek to destroy her kind. With the help of a rogue witch hunter, she sets out on a dangerous mission to uncover the truth about the government's dark secrets and restore balance to the world. But as the stakes get higher and the risks get greater, she must confront her own fears and decide what she's willing to sacrifice for the greater good."},
    {img: "img/covers/6.png", title: "The Unseen World", catalogs: "Comedy", rating: 7.1, movie_quality: "HD", limited_age: 16, description: "When a brilliant scientist invents a machine that can access parallel universes, she unwittingly unleashes a dangerous force that threatens to destroy everything she holds dear. With the help of her trusted colleagues, she must race against time to stop the machine from falling into the wrong hands and prevent a catastrophic chain reaction that could unravel the fabric of reality itself. But as she delves deeper into the unseen world, she realizes that the greatest danger may be closer than she ever imagined."}
];

// Tạo các Item từ data cho phần New items
function createItemOfNewItem(image, title, catalogs, rating, movie_quality, limited_age, description) {
    let div = document.createElement("div");
    div.className = "col-6 col-sm-12 col-lg-6 col-xxl-4";
    let div1 = document.createElement("div");
    div1.className = "item item--list";
    let a = document.createElement("a");
    a.href = "details1.html";
    a.className = "item__cover";
    let img = document.createElement("img");
    img.src = image;
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
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div11.appendChild(h3);
    let span_of_div11 = document.createElement("span");
    span_of_div11.className = "item__category";
    let a_of_span = document.createElement("a");
    a_of_span.href = "#";
    a_of_span.textContent = catalogs;
    span_of_div11.appendChild(a_of_span);
    div11.appendChild(span_of_div11);
    let div111 = document.createElement("div");
    div111.className = "item__wrap";
    let span_of_div111 = document.createElement("span");
    span_of_div111.className = "item__rate";
    span_of_div111.textContent = rating;
    div111.appendChild(span_of_div111);
    let ul_of_div111 = document.createElement("ul");
    ul_of_div111.className = "item__list";
    let li1 = document.createElement("li");
    li1.textContent = movie_quality;
    ul_of_div111.appendChild(li1);
    let li2 = document.createElement("li");
    li2.textContent = limited_age + "+";
    ul_of_div111.appendChild(li2);
    div111.appendChild(ul_of_div111);
    div11.appendChild(div111);
    let div112 = document.createElement("div");
    div112.className = "item__description";
    let p = document.createElement("p");
    p.textContent = description;
    div112.appendChild(p);
    div11.appendChild(div112);
    div1.appendChild(div11);
    div.appendChild(div1);
    return div;
};

// Hàm add data vào phần newitem
function add_item_of_new_item(dataset) {
    let new_item = document.getElementById("add-item-of-new-item");
    dataset.forEach(function(data) {
        let item = createItemOfNewItem(data.img, data.title, data.catalogs, data.rating, data.movie_quality, data.limited_age, data.description);
        new_item.appendChild(item);
    });
};

// Hàm tạo item cho firm
function createNewItemForFilm(cover_img_url, title, genres, average_rating) {
    let div = document.createElement("div");
    div.className = "col-6 col-sm-4 col-lg-3 col-xl-2";
    let div1 = document.createElement("div");
    div1.className = "item";
    let a = document.createElement("a");
    a.href = "details1.html";
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
    a_of_h3.href = "details1.html";
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

// Hàm add data cho phần now watching
function addDataFilm(dataset, id){
    let new_item = document.getElementById(id);
    dataset.forEach(function(data){
        let newLi = createNewItemForFilm(data.cover_img_url, data.title, data.genres, data.average_rating);
        new_item.appendChild(newLi);
    });
};

const fetchData = async(url) => {
    try {
        const token = localStorage.getItem('token');
        // console.log(token);
        const response = await axios.get(url,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

function UpdateDataNewItemOfThisSeason() {
    const url = `http://localhost:8080/api`;
    fetchData(url).then(dataset => {
        UpdateNewItemOfThisSeason(dataset.newMovies);
    });
};

function UpdateDataFilmGenres(genre, getElementById) {
    const url = `http://localhost:8080/api/movies?genre=${genre}`;
    fetchData(url).then(dataset => {
        addDataFilm(dataset.movies, getElementById);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    console.log(localStorage.getItem('token'));
    UpdateDataNewItemOfThisSeason();
    add_item_of_new_item(dataNewItem);
    let getElementById = "add-item-for-anime";
    let genre = 'Animation';
    UpdateDataFilmGenres(genre, getElementById);
    
    getElementById = "add-item-for-movie";
    genre = 'Action';
    UpdateDataFilmGenres(genre, getElementById);
    getElementById = "add-item-for-tvshow";
    genre = 'TV Movie';
    UpdateDataFilmGenres(genre, getElementById);
    getElementById = "add-now-watching";
    genre = 'Adventure';
    UpdateDataFilmGenres(genre, getElementById);
});

