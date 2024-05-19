const postAccountAdmin = async () => {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if(email === '' || password === ''){
            showCustomAlert('Please enter email and password');
            return;
        }
        const response = await axios.post('http://localhost:8080/api/signin', {
            username: email,
            password: password
        });
        localStorage.setItem('token_admin', response.data.token);
        console.log(response);
        localStorage.setItem('token', "")
        window.location.href = 'http://localhost:3000/admin-catalog';
    } catch (error) {
        let deny_access = document.querySelector("#check-admin label");
        deny_access.style.display = "block";
    }
};

const signin = document.getElementById('signin');

document.addEventListener("DOMContentLoaded", function(){
    signin.addEventListener('click', function(){
        postAccountAdmin();
    });
});