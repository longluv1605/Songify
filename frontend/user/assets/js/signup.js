const createAccount = async() => {
    try {
        // Lấy giá trị của phần tử input đầu tiên với placeholder là "Firstname"
        const firstname = document.querySelector('.sign__input[placeholder="Firstname"]').value;
        // Lấy giá trị của phần tử input có placeholder là "Lastname"
        const lastname = document.querySelector('.sign__input[placeholder="Lastname"]').value;
        // Lấy giá trị của phần tử input có placeholder là "Username"
        const username = document.querySelector('.sign__input[placeholder="Username"]').value;
        // Lấy giá trị của phần tử input có placeholder là "Email"
        const email = document.querySelector('.sign__input[placeholder="Email"]').value;
        // Lấy giá trị của phần tử input cuối cùng có kiểu là password
        const password = document.querySelector('.sign__input[type="password"]').value;
        if(email === '' || password === ''||firstname ===''||lastname ===''||username ===''){
            alert('Please fill all the blank spaces');
            return;
        }
        const response = await axios.post('http://localhost:8080/api/register', {
            username : username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        });
        console.log(response);
        // localStorage.setItem('token', response.data.token);
        localStorage.setItem('movieid', "");
        localStorage.setItem('genre', "");
        window.location.href = 'http://localhost:3000';
    } catch (error) {
        console.log(error);
    }
};

const signup = document.getElementById('sign_up');

document.addEventListener("DOMContentLoaded", function(){
    signup.addEventListener('click', function(){
        createAccount();
    });
});