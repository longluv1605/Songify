const dataSearch = async (searchValue) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/search?string=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const genres = response.data.movies[0].genres;
        // console.log(genres);
        const genre = genres.split(', ');
        localStorage.setItem('genre', genre[0]);
        window.location.href = "http://localhost:3000/catalog";
    } catch (error) {
        console.log(error);
    }
};

// Load giá trị của placeholder từ Local Storage khi trang được load
window.addEventListener("DOMContentLoaded", function() {
    // var savedPlaceholder = localStorage.getItem("search");
    // if (savedPlaceholder) {
    //     document.getElementById("submitSearch").querySelector('input').placeholder = savedPlaceholder;
    // }
    document.querySelectorAll(".submitSearch").forEach((item) => {
        item.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Lấy giá trị của ô input
            var searchTerm = document.querySelector("input");
            console.log(searchTerm);
            var value = searchTerm.value;
            localStorage.setItem("search", value);
            dataSearch(value);    
            // var value = searchTerm.value;
        });
    });
});
