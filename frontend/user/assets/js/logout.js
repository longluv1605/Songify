// const check_out = async() => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/api/logout', {
//             headers: {Authorization: `Bearer ${token}`}
//         });
//         localStorage.setItem('token', "");
//         localStorage.setItem('movieid', "");
//         localStorage.setItem('genre', "");
//         localStorage.setItem('search', "");
//         localStorage.setItem('will_like',"");
//         localStorage.setItem('label', "");
//         window.location.href = 'http://localhost:3000/signin';
//     } catch (error) {
//         console.log(error);
//         // window.location.href = 'http://localhost:3000/signin';
//     }
// };

function check_out(){
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/logout', {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
        localStorage.setItem('token', "");
        localStorage.setItem('movieid', "");
        localStorage.setItem('genre', "");
        localStorage.setItem('search', "");
        localStorage.setItem('will_like',"");
        localStorage.setItem('label', "");
        window.location.href = 'http://localhost:3000/signin';
    }).catch(error => {
        alert(error.response.data.message);
        window.location.href = 'http://localhost:3000/signin';
    });
};

document.addEventListener("DOMContentLoaded", function(){
    const logout = document.querySelectorAll('#logout');
    logout.forEach((item) => {
        item.addEventListener('click', check_out);
    });
    const token = localStorage.getItem('token');
    if (token===null || token==='') {
        localStorage.setItem('token', "");
        localStorage.setItem('movieid', "");
        localStorage.setItem('genre', "");
        localStorage.setItem('search', "");
        localStorage.setItem('will_like',"");
        localStorage.setItem('label', "");
        window.location.href = 'http://localhost:3000/signin';
    }
});