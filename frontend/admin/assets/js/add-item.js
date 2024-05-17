function postDataFilm() {
    const token_admin = localStorage.getItem('token_admin');
    const get_title = document.getElementById('get_title').value;
    console.log(get_title);
    const get_description = document.getElementById('get_description').value;
    console.log(get_description);
    const get_release_year = document.getElementById('get_release_year').value;
    console.log(get_release_year);
    const get_duration = document.getElementById('get_duration').value;
    console.log(get_duration);
    const get_image_url = document.getElementById('get_image_url').value;
    console.log(get_image_url);
    const get_trailer_url = document.getElementById('get_trailer_url').value;
    console.log(get_trailer_url);
    const get_film_url = document.getElementById('get_film_url').value;
    console.log(get_film_url);
    const get_label = document.getElementById('sign__quality').value;
    console.log(get_label);
    const get_actor = document.getElementById('get_actor').value;
    console.log(get_actor);
    const get_director = document.getElementById('get_director').value;
    console.log(get_director);
    const get_genres = document.getElementById('sign__genre');
    const selectedGenres = Array.from(get_genres.selectedOptions).map(option => option.value);
    console.log(selectedGenres);
    axios.post('http://localhost:8080/api/admin/movie',
        {
            title: get_title,
            description: get_description,
            release_year: get_release_year,
            duration: get_duration,
            cover_img_url: get_image_url,
            trailer_url: get_trailer_url,
            film_url: get_film_url,
            labels: get_label,
            actors: get_actor,
            directors: get_director,
            genres: selectedGenres
        },
        {
            headers: {Authorization: `Bearer ${token_admin}`},
        }
    ).then((response) => {
        if(response.status === 200){
            alert(response.data.message);
            window.location.reload();
        }
    }).catch((error) => {
        console.log(error);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const publish = document.getElementById('publish_button');
    publish.addEventListener('click', postDataFilm);
});