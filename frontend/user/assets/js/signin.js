const postAcout = async() => {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email, password);
        if(email === '' || password === ''){
            alert('Please enter email and password');
            return;
        }
        
        const response = await axios.post('http://localhost:8080/api/login', {
            email: email,
            password: password
        });
        console.log(response);
        localStorage.setItem('token', response.data.token);
        window.location.href = 'http://localhost:3000/home';
    } catch (error) {
        console.log(error);
    }
};

const signin = document.getElementById('signin');

document.addEventListener("DOMContentLoaded", function(){
    signin.addEventListener('click', function(){
        postAcout();
        // signIn();
    });
});