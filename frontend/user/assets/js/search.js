// const dataSearch = async (searchValue) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:8080/api/search/${searchValue}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         console.log("searched" ,response.data);
//         if (response.data.length === 0) {
//             throw new Error("No movies for this search!");
//         }
//         const genres = response.data[0].genres;
//         const genre = genres.split(', ');
//         localStorage.setItem('will_like', genre[0]);
//         localStorage.setItem('genre', genre[0]);
//         localStorage.setItem('movieid', response.data[0].id);
//         window.location.href = "http://localhost:3000/catalog";
//     } catch (error) {
//         // window.location.href = "http://localhost:3000/catalog";
//     }
// };

// Load giá trị của placeholder từ Local Storage khi trang được load
window.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".submitSearch").forEach((item) => {
        item.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Lấy giá trị của ô input
            var searchTerm = document.querySelector("input");
            // console.log(searchTerm);
            var value = searchTerm.value;
            if (value === "") {
                showCustomAlert("Please type a movie first!");
                return;
            }
            localStorage.setItem("search", value);
            window.location.href = "http://localhost:3000/catalog";    
        });
        const button = item.querySelector("button");
        button.addEventListener("click", function() {
            var searchTerm = document.querySelector("input");
            var value = searchTerm.value;
            if (value === "") {
                showCustomAlert("Please type a movie first!");
                return;
            }
            localStorage.setItem("search", value);
            window.location.href = "http://localhost:3000/catalog";    
        });
    });
});
