function changeAdminName(data){
    var name = document.getElementById("add-name-of-admin");
    name.innerText = data.first_name + " " + data.last_name;
};

function postDataFilm() {
    const token_admin = localStorage.getItem('token_admin');
    const get_title = document.getElementById('get_title').value;
    const get_description = document.getElementById('get_description').value;
    const get_release_year = document.getElementById('get_release_year').value;
    const get_duration = document.getElementById('get_duration').value;
    const get_image_url = document.getElementById('get_image_url').value;
    const get_trailer_url = document.getElementById('get_trailer_url').value;
    const get_film_url = document.getElementById('get_film_url').value;
    const get_label = document.getElementById('sign__quality').value;
    const get_actor = document.getElementById('get_actor').value;
    const get_director = document.getElementById('get_director').value;
    const get_genres = document.getElementById('sign__genre');
    const selectedGenres = Array.from(get_genres.selectedOptions).map(option => option.value);
    if (get_title === '' || get_description === '' || get_release_year === '' || get_duration === '' || get_image_url === '' || get_trailer_url === '' || get_film_url === '' || get_label === '' || get_actor === '' || get_director === '' || selectedGenres.length === 0) {
        showCustomAlert('Please fill in all fields');
        return;
    };
    // console.log(get_title, get_description, get_release_year, get_duration, get_image_url, get_trailer_url, get_film_url, get_label, get_actor, get_director, selectedGenres);
    axios.post('http://localhost:8080/api/admin/movie_manage/add',
        {
            title: get_title,
            description: get_description,
            release_year: get_release_year,
            duration: get_duration,
            cover_img_url: get_image_url,
            trailer_url: get_trailer_url,
            film_url: get_film_url,
            label: get_label,
            actors: get_actor,
            directors: get_director,
            genres: selectedGenres
        },
        {
            headers: {Authorization: `Bearer ${token_admin}`},
        }
    ).then((response) => {
        if(response.status === 200){
            showCustomAlert(response.data.message);
            // window.location.reload();
        }
    }).catch((error) => {
        console.log(error);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const publish = document.getElementById('publish_button');
    publish.addEventListener('click', postDataFilm);
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
});