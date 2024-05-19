const move_genres = document.querySelectorAll('.set_genre');

document.addEventListener('DOMContentLoaded', function() {
    move_genres.forEach(function(list){
        list.addEventListener('click', function() {
            let genre = this.textContent;
            // console.log(genre);
            localStorage.setItem('genre', genre);
            // console.log(localStorage.getItem('genre'));
            window.location.href = 'http://localhost:3000/catalog';
        });
    })
});