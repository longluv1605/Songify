const postAccount = async() => {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // console.log(email, password);
        if(email === '' || password === ''){
            alert('Please enter email and password');
            return;
        }
        const response = await axios.post('http://localhost:8080/api/login', {
            username: email,
            password: password
        });
        // console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('movieid', "");
        localStorage.setItem('genre', "");
        localStorage.setItem('search', "");
        localStorage.setItem('will_like',"");
        localStorage.setItem('label', "");
        window.location.href = 'http://localhost:3000/home';
    } catch (error) {
        let deny_access = document.querySelector("#check-person label")
        deny_access.style.display = "block";
    }
};

const signin = document.getElementById('signin');

document.addEventListener("DOMContentLoaded", function(){
    signin.addEventListener('click', function(){
        postAccount();
    });
});