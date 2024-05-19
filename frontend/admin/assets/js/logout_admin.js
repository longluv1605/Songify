const check_out = async() => {
    try {
        const token = localStorage.getItem('token_admin');
        const response = await axios.post('http://localhost:8080/api/signout', null,{
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log(response);
        localStorage.setItem('token_admin', "");
        sessionStorage.setItem('checkUserId', "");
        sessionStorage.setItem('checkMovieId', "");
        window.location.href = 'http://localhost:3000/admin-signin';
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener("DOMContentLoaded", function(){
    const logout = document.querySelectorAll('#logout_admin');
    logout.forEach((item) => {
        item.addEventListener('click', function() {
            check_out();
        });
    });
    const token = localStorage.getItem('token_admin');
    if (token===null || token==='') {
        window.location.href = 'http://localhost:3000/admin-signin';
    }
});