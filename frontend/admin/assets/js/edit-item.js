const token_admin = localStorage.getItem('token_admin');
const checkMovieId = sessionStorage.getItem('checkMovieId');

function changeAdminName(data){
    var name = document.getElementById("add-name-of-admin");
    name.innerText = data.first_name + " " + data.last_name;
};

function fetchDataAndchangeAdminName(){
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
};

function movieInfomation(){
    let get_title = document.getElementById("get_title");
    let get_description = document.getElementById("get_description");
    let get_image_url = document.getElementById("get_image_url");
    let sign__quality = document.getElementById("sign__quality");
    let get_release_year = document.getElementById("get_release_year");
    let sign__genre = document.getElementById("sign__genre");
    let get_duration = document.getElementById("get_duration");
    let get_director = document.getElementById("get_director");
    let get_trailer_url = document.getElementById("get_trailer_url");
    let get_film_url = document.getElementById("get_film_url");
    let get_actor = document.getElementById("get_actor");
    axios.get(`http://localhost:8080/api/movies/${checkMovieId}`,
        {
            headers: {Authorization: `Bearer ${token_admin}`}
        }
    ).then(response => {
        const data = response.data.movieData[0];
        get_title.placeholder = data.title;
        get_description.placeholder = data.description;
        get_image_url.placeholder = data.cover_img_url;
        sign__quality.value = data.label;
        // console.log("alo"+sign__quality.value);
        // console.log(data.label);
        get_release_year.placeholder = data.release_year;
        sign__genre.value = data.genres.split(", ");
        // for (let option of sign__genre.options) {
        //     // console.log(option);
        //     if (data.genres.includes(option.value)) {
        //         option.selected = true;
        //     }
        // }
        get_duration.placeholder = data.duration;
        get_director.placeholder = data.directors;
        get_trailer_url.placeholder = data.trailer_url;
        get_film_url.placeholder = data.film_url;
        get_actor.placeholder = data.actors;
        console.log(data);
    }).catch(error => {
        console.log(error.response.data.message);
    });
};

function editMovie(){
    let get_title = document.getElementById("get_title").value;
    let get_description = document.getElementById("get_description").value;
    let get_image_url = document.getElementById("get_image_url").value;
    let sign__quality = document.getElementById("sign__quality").value;
    let get_release_year = document.getElementById("get_release_year").value;
    let get_genres = document.getElementById("sign__genre");
    let get_duration = document.getElementById("get_duration").value;
    let get_director = document.getElementById("get_director").value;
    let get_trailer_url = document.getElementById("get_trailer_url").value;
    let get_film_url = document.getElementById("get_film_url").value;
    let get_actor = document.getElementById("get_actor").value;
    let selectedGenres = Array.from(get_genres.selectedOptions).map(option => option.value);
    if (get_title === '' || get_description === '' || get_release_year === '' || get_duration === '' || get_image_url === '' || get_trailer_url === '' || get_film_url === '' || sign__quality === '' || get_actor === '' || get_director === '' || selectedGenres.length === 0) {
        showCustomAlert('Please fill in all fields');
        return;
    };
    axios.put(`http://localhost:8080/api/admin/movie_manage/change_info/${checkMovieId}`,
        {
            title: get_title,
            description: get_description,
            release_year: get_release_year,
            duration: get_duration,
            cover_img_url: get_image_url,
            trailer_url: get_trailer_url,
            film_url: get_film_url,
            label: sign__quality,
            actors: get_actor,
            directors: get_director,
            label: sign__quality,
            genres: selectedGenres
        },
        {
            headers: {Authorization: `Bearer ${token_admin}`}
        }
    ).then(response => {
        if(response.status === 200){
            showCustomAlert("Edit movie successfully (.^_^.)");
            // window.location.reload();
        }
    }).catch(error => {
        showCustomAlert("Edit movie failed (T_T)");
    });
}

document.addEventListener('DOMContentLoaded', function(){
    fetchDataAndchangeAdminName();
    movieInfomation();
    const publish = document.getElementById('publish_button');
    publish.addEventListener('click', editMovie);
});