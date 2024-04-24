var dataNewItemOfThisSeason = [
    {img: "img/covers/1.png", title: "Midnight Sun", catalogs: ["Comedy"], rating: 7.1},
    {img: "img/covers/2.png", title: "The Shadow Hunter", catalogs: ["Romance","Drama", "Music"], rating: 6.3},
    {img: "img/covers/3.png", title: "Wild Hearts", catalogs: ["Comedy", "Drama"], rating: 6.3},
    {img: "img/covers/4.png", title: "Blindspotting", catalogs: ["Action", "Trailer"], rating: 7.9},
    {img: "img/covers/5.png", title: "Tales from the Underworld", catalogs: ["Action", "Western"], rating: 8.6},
    {img: "img/covers/6.png", title: "Midnight Sun", catalogs: ["Drama"], rating: 7.7},
    {img: "img/covers/7.png", title: "Wild Hearts", catalogs: ["Comedy"], rating: 8.2},
    {img: "img/covers/8.png", title: "Red Sky at Night", catalogs: ["Comedy"], rating: 7.1},
    {img: "img/covers/9.png", title: "The Forgotten Road", catalogs: ["Romance", "Drama", "Music"], rating: 6.3},
    {img: "img/covers/10.png", title: "Echoes of the Past", catalogs: ["Fantasy"], rating: 9.2},
    {img: "img/covers/11.png", title: "Echoes of Yesterday", catalogs: ["Action", "Trailer"], rating: 8.4},
    {img: "img/covers/12.png", title: "The Last Hope", catalogs: ["Animals", "Documentary"], rating: 7.3},
    {img: "img/covers/13.png", title: "The Edge of Tomorrow", catalogs: ["Action", "Sci-Fi"], rating: 8.4},
    {img: "img/covers/14.png", title: "A Light in the Darkness", catalogs: ["Comedy", "Drama"], rating: 7.9},
    {img: "img/covers/15.png", title: "Endless Horizon", catalogs: ["Action", "Trailer"], rating: 8.4},
    {img: "img/covers/16.png", title: "Beyond the Horizon", catalogs: ["Drama"], rating: 7.1},
    {img: "img/covers/17.png", title: "Reckoning", catalogs: ["Romance", "Drama", "Music"], rating: 6.3},
    {img: "img/covers/18.png", title: "Savage Beauty", catalogs: ["Comedy", "Drama"], rating: 7.9}
];

// Thêm item từ data cho phần New item of this season
function createNewItemOfThisSeason(image, title, catalogs, rating) {
    var newLi = document.createElement("li");
    newLi.className = "splide__slide";
    var newDiv = document.createElement("div");
    newDiv.className = "item item--big";
    var item_play = document.createElement("a");
    item_play.href = "details1.html";
    item_play.className = "item__cover";
    var img = document.createElement("img");
    img.src = image;
    img.alt = "";
    item_play.appendChild(img);
    var span_of_a = document.createElement("span");
    span_of_a.className = "item__play";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span_of_a.appendChild(svg);
    item_play.appendChild(span_of_a);
    newDiv.appendChild(item_play);
    var div_1 = document.createElement("div");
    div_1.className = "item__content";
    var h3 = document.createElement("h3");
    h3.className = "item__title";
    var a_of_h3 = document.createElement("a");
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div_1.appendChild(h3);
    var span1 = document.createElement("span");
    span1.className = "item__category";
    catalogs.forEach(function(temp){
        var a1 = document.createElement("a");
        a1.href = "#";
        a1.textContent = temp;
        span1.appendChild(a1);
    });
    div_1.appendChild(span1);
    var span2 = document.createElement("span");
    span2.className = "item__rate";
    span2.textContent = rating;
    div_1.appendChild(span2);
    newDiv.appendChild(div_1);
    newLi.appendChild(newDiv);
    return newLi;
};

// Hàm add data cho phần new item of this season
function add_new_item_of_this_season(dataset){
    var new_item = document.getElementById("add-new-item-of-this-season");
    dataset.forEach(function(data){
        var newLi = createNewItemOfThisSeason(data.img, data.title, data.catalogs, data.rating);
        new_item.appendChild(newLi);
    });
};

var dataNewItem = [
    {img: "img/covers/1.png", title: "The Lost City", catalogs: ["Action", "Trailer"], rating: 8.4, movie_quality: "HD", limited_age: 16, description: "When a renowned archaeologist goes missing, his daughter sets out on a perilous journey to the heart of the Amazon rainforest to find him. Along the way, she discovers a hidden city and a dangerous conspiracy that threatens the very balance of power in the world. With the help of a charming rogue, she must navigate treacherous terrain and outwit powerful enemies to save her father and uncover the secrets of the lost city."},
    {img: "img/covers/2.png", title: "Undercurrents", catalogs: ["Comedy"], rating: 7.1, movie_quality: "FHD", limited_age: 18, description: "A brilliant scientist discovers a way to harness the power of the ocean's currents to create a new, renewable energy source. But when her groundbreaking technology falls into the wrong hands, she must race against time to stop it from being used for evil. Along the way, she must navigate complex political alliances and confront her own past to save the world from disaster."},
    {img: "img/covers/3.png", title: "Redemption Road", catalogs: ["Romance", "Drama", "Music"], rating: 6.3, movie_quality: "HD", limited_age: 12, description: "A down-on-his-luck boxer struggles to make ends meet while raising his young son. When an old friend offers him a chance to make some quick cash by fighting in an illegal underground boxing tournament, he sees it as his last shot at redemption. But as the stakes get higher and the fights get more brutal, he must confront his own demons and find the strength to win not just for himself, but for his son."},
    {img: "img/covers/4.png", title: "Tales from the Underworld", catalogs: ["Comedy", "Drama"], rating: 7.9, movie_quality: "HD", limited_age: 16, description: "When a luxury cruise ship sets sail on its final voyage before retirement, the passengers and crew expect nothing but relaxation and indulgence. But when a mysterious illness spreads through the ship, they find themselves fighting for survival in the middle of the ocean. As tensions rise and resources dwindle, they must confront their own mortality and make impossible choices to stay alive."},
    {img: "img/covers/5.png", title: "Voices from the Other Side", catalogs: ["Action", "Trailer"], rating: 8.4, movie_quality: "HD", limited_age: 12, description: "In a world where magic is outlawed and hunted, a young witch must use her powers to fight back against the corrupt authorities who seek to destroy her kind. With the help of a rogue witch hunter, she sets out on a dangerous mission to uncover the truth about the government's dark secrets and restore balance to the world. But as the stakes get higher and the risks get greater, she must confront her own fears and decide what she's willing to sacrifice for the greater good."},
    {img: "img/covers/6.png", title: "The Unseen World", catalogs: ["Comedy"], rating: 7.1, movie_quality: "HD", limited_age: 16, description: "When a brilliant scientist invents a machine that can access parallel universes, she unwittingly unleashes a dangerous force that threatens to destroy everything she holds dear. With the help of her trusted colleagues, she must race against time to stop the machine from falling into the wrong hands and prevent a catastrophic chain reaction that could unravel the fabric of reality itself. But as she delves deeper into the unseen world, she realizes that the greatest danger may be closer than she ever imagined."}
];

// Tạo các Item từ data cho phần New items
function createItemOfNewItem(image, title, catalogs, rating, movie_quality, limited_age, description) {
    var div = document.createElement("div");
    div.className = "col-6 col-sm-12 col-lg-6 col-xxl-4";
    var div1 = document.createElement("div");
    div1.className = "item item--list";
    var a = document.createElement("a");
    a.href = "details1.html";
    a.className = "item__cover";
    var img = document.createElement("img");
    img.src = image;
    img.alt = "";
    a.appendChild(img);
    var span = document.createElement("span");
    span.className = "item__play";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span.appendChild(svg);
    a.appendChild(span);
    div1.appendChild(a);

    var div11 = document.createElement("div");
    div11.className = "item__content";
    var h3 = document.createElement("h3");
    h3.className = "item__title";
    var a_of_h3 = document.createElement("a");
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div11.appendChild(h3);
    var span_of_div11 = document.createElement("span");
    span_of_div11.className = "item__category";
    catalogs.forEach(function(temp) {
        var a_of_span = document.createElement("a");
        a_of_span.href = "#";
        a_of_span.textContent = temp;
        span_of_div11.appendChild(a_of_span);
    });
    div11.appendChild(span_of_div11);
    var div111 = document.createElement("div");
    div111.className = "item__wrap";
    var span_of_div111 = document.createElement("span");
    span_of_div111.className = "item__rate";
    span_of_div111.textContent = rating;
    div111.appendChild(span_of_div111);
    var ul_of_div111 = document.createElement("ul");
    ul_of_div111.className = "item__list";
    var li1 = document.createElement("li");
    li1.textContent = movie_quality;
    ul_of_div111.appendChild(li1);
    var li2 = document.createElement("li");
    li2.textContent = limited_age + "+";
    ul_of_div111.appendChild(li2);
    div111.appendChild(ul_of_div111);
    div11.appendChild(div111);
    var div112 = document.createElement("div");
    div112.className = "item__description";
    var p = document.createElement("p");
    p.textContent = description;
    div112.appendChild(p);
    div11.appendChild(div112);
    div1.appendChild(div11);
    div.appendChild(div1);
    return div;
};

// Hàm add data vào phần newitem
function add_item_of_new_item(dataset) {
    var new_item = document.getElementById("add-item-of-new-item");
    dataset.forEach(function(data) {
        var item = createItemOfNewItem(data.img, data.title, data.catalogs, data.rating, data.movie_quality, data.limited_age, data.description);
        new_item.appendChild(item);
    });
};

// Hàm tạo item cho movie
function createNewItemForMovie(image, title, catalogs, rating) {
    var div = document.createElement("div");
    div.className = "col-6 col-sm-4 col-lg-3 col-xl-2";
    var div1 = document.createElement("div");
    div1.className = "item";
    var a = document.createElement("a");
    a.href = "details1.html";
    a.className = "item__cover";
    var img = document.createElement("img");
    img.src = image;
    img.alt = "";
    a.appendChild(img);
    var span = document.createElement("span");
    span.className = "item__play";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span.appendChild(svg);
    a.appendChild(span);
    div1.appendChild(a);
    var div11 = document.createElement("div");
    div11.className = "item__content";
    var h3 = document.createElement("h3");
    h3.className = "item__title";
    var a_of_h3 = document.createElement("a");
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div11.appendChild(h3);
    var span1_of_div11 = document.createElement("span");
    span1_of_div11.className = "item__category";
    catalogs.forEach(function(temp) {
        var a_of_span = document.createElement("a");
        a_of_span.href = "#";
        a_of_span.textContent = temp;
        span1_of_div11.appendChild(a_of_span);
    });
    div11.appendChild(span1_of_div11);
    var span2_of_div11 = document.createElement("span");
    span2_of_div11.className = "item__rate";
    span2_of_div11.textContent = rating;
    div11.appendChild(span2_of_div11);
    div1.appendChild(div11);
    div.appendChild(div1);
    return div;
};

// Hàm add item cho movie
function add_item_for_movie(dataset) {
    var new_item = document.getElementById("add-item-for-movie");
    dataset.forEach(function(data) {
        var item = createNewItemForMovie(data.img, data.title, data.catalogs, data.rating);
        new_item.appendChild(item);
    });
};

// Hàm tạo item cho tvshow
function createNewItemForTVShow(image, title, catalogs, rating) {
    var div = document.createElement("div");
    div.className = "col-6 col-sm-4 col-lg-3 col-xl-2";
    var div1 = document.createElement("div");
    div1.className = "item";
    var a = document.createElement("a");
    a.href = "details1.html";
    a.className = "item__cover";
    var img = document.createElement("img");
    img.src = image;
    img.alt = "";
    a.appendChild(img);
    var span = document.createElement("span");
    span.className = "item__play";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span.appendChild(svg);
    a.appendChild(span);
    div1.appendChild(a);
    var div11 = document.createElement("div");
    div11.className = "item__content";
    var h3 = document.createElement("h3");
    h3.className = "item__title";
    var a_of_h3 = document.createElement("a");
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div11.appendChild(h3);
    var span1_of_div11 = document.createElement("span");
    span1_of_div11.className = "item__category";
    catalogs.forEach(function(temp) {
        var a_of_span = document.createElement("a");
        a_of_span.href = "#";
        a_of_span.textContent = temp;
        span1_of_div11.appendChild(a_of_span);
    });
    div11.appendChild(span1_of_div11);
    var span2_of_div11 = document.createElement("span");
    span2_of_div11.className = "item__rate";
    span2_of_div11.textContent = rating;
    div11.appendChild(span2_of_div11);
    div1.appendChild(div11);
    div.appendChild(div1);
    return div;
};

// Hàm add item cho tvshow
function add_item_for_tvshow(dataset) {
    var new_item = document.getElementById("add-item-for-tvshow");
    dataset.forEach(function(data) {
        var item = createNewItemForTVShow(data.img, data.title, data.catalogs, data.rating);
        new_item.appendChild(item);
    });
};

// Hàm tạo item cho anime
function createNewItemForAnime(image, title, catalogs, rating) {
    var div = document.createElement("div");
    div.className = "col-6 col-sm-4 col-lg-3 col-xl-2";
    var div1 = document.createElement("div");
    div1.className = "item";
    var a = document.createElement("a");
    a.href = "details1.html";
    a.className = "item__cover";
    var img = document.createElement("img");
    img.src = image;
    img.alt = "";
    a.appendChild(img);
    var span = document.createElement("span");
    span.className = "item__play";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span.appendChild(svg);
    a.appendChild(span);
    div1.appendChild(a);
    var div11 = document.createElement("div");
    div11.className = "item__content";
    var h3 = document.createElement("h3");
    h3.className = "item__title";
    var a_of_h3 = document.createElement("a");
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div11.appendChild(h3);
    var span1_of_div11 = document.createElement("span");
    span1_of_div11.className = "item__category";
    catalogs.forEach(function(temp) {
        var a_of_span = document.createElement("a");
        a_of_span.href = "#";
        a_of_span.textContent = temp;
        span1_of_div11.appendChild(a_of_span);
    });
    div11.appendChild(span1_of_div11);
    var span2_of_div11 = document.createElement("span");
    span2_of_div11.className = "item__rate";
    span2_of_div11.textContent = rating;
    div11.appendChild(span2_of_div11);
    div1.appendChild(div11);
    div.appendChild(div1);
    return div;
};

// Hàm add item cho anime
function add_item_for_anime(dataset) {
    var new_item = document.getElementById("add-item-for-anime");
    dataset.forEach(function(data) {
        var item = createNewItemForAnime(data.img, data.title, data.catalogs, data.rating);
        new_item.appendChild(item);
    });
};

// Thêm item từ data cho phần Now watching
function createNewItemOfNowWatching(image, title, catalogs, rating) {
    var newLi = document.createElement("li");
    newLi.className = "splide__slide";
    var newDiv = document.createElement("div");
    newDiv.className = "item item--carousel";
    var item_play = document.createElement("a");
    item_play.href = "details1.html";
    item_play.className = "item__cover";
    var img = document.createElement("img");
    img.src = image;
    img.alt = "";
    item_play.appendChild(img);
    var span_of_a = document.createElement("span");
    span_of_a.className = "item__play";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z");
    svg.appendChild(path);
    span_of_a.appendChild(svg);
    item_play.appendChild(span_of_a);
    newDiv.appendChild(item_play);
    var div_1 = document.createElement("div");
    div_1.className = "item__content";
    var h3 = document.createElement("h3");
    h3.className = "item__title";
    var a_of_h3 = document.createElement("a");
    a_of_h3.href = "details1.html";
    a_of_h3.textContent = title;
    h3.appendChild(a_of_h3);
    div_1.appendChild(h3);
    var span1 = document.createElement("span");
    span1.className = "item__category";
    catalogs.forEach(function(temp){
        var a1 = document.createElement("a");
        a1.href = "#";
        a1.textContent = temp;
        span1.appendChild(a1);
    });
    div_1.appendChild(span1);
    var span2 = document.createElement("span");
    span2.className = "item__rate";
    span2.textContent = rating;
    div_1.appendChild(span2);
    newDiv.appendChild(div_1);
    newLi.appendChild(newDiv);
    return newLi;
};

// Hàm add data cho phần now watching
function add_new_item_of_now_watching(dataset){
    var new_item = document.getElementById("add-now-watching");
    dataset.forEach(function(data){
        var newLi = createNewItemOfNowWatching(data.img, data.title, data.catalogs, data.rating);
        new_item.appendChild(newLi);
    });
};


add_new_item_of_this_season(dataNewItemOfThisSeason);
add_item_of_new_item(dataNewItem);
add_item_for_movie(dataNewItemOfThisSeason);
add_item_for_tvshow(dataNewItemOfThisSeason);
add_item_for_anime(dataNewItemOfThisSeason);
add_new_item_of_now_watching(dataNewItemOfThisSeason);