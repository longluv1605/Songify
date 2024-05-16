const changePassword = async() => {
    try{
        // cần api put với đầu vào là username và newpassword
    }
    catch(error){
        console.log(error);
    }
}

const userNameInput = document.querySelector('input[placeholder="User Name"]');
const newPasswordInput = document.querySelector('input[placeholder="New Password"]');
const confirmNewPasswordInput = document.querySelector('input[placeholder="Confirm New Password"]');
const recover_button = document.querySelector(".sign__btn")
const changed_successfully = document.getElementById("success")
document.addEventListener("DOMContentLoaded", function(){
    recover_button.addEventListener("click", function(){
        // console.log(userNameInput.value, newPasswordInput.value, confirmNewPasswordInput.value);
        if(userNameInput.value.trim() === '' || newPasswordInput.value.trim() === '' || confirmNewPasswordInput.value.trim() === ''){
            alert("Please fill all the blank spaces")
            return
        }
        if(newPasswordInput.value.trim() != confirmNewPasswordInput.value.trim()){
            alert("New password and confirm new password are not identical")
            return
        }
        changed_successfully.style.display = "block"
    })  
})