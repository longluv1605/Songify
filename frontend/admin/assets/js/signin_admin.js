const postAccountAdmin = async (data) => {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if(email === '' || password === ''){
            alert('Please enter email and password');
            return;
        }
        const response = await axios.post('http://localhost:8080/api/admin/login', {
            username: email,
            password: password
        });
        localStorage.setItem('token_admin', response.data.token);

        window.location.href = 'http://localhost:3000/admin/catalog';
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