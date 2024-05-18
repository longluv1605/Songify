const changePass = async(authCode, newPassword) => {
    try{
        const response = await axios.post('http://localhost:8080/api/forgot',
            {
                authCode: authCode,
                newPassword: newPassword
            }
        )
        console.log(response);
        changed_successfully.style.display = "block"
    }
    catch(error){
        if(error){
            showCustomAlert("Verified code is incorrect")
        }
    }
}

const Verify = document.querySelector('input[placeholder="Verified code"]');
const Newpass = document.querySelector('input[placeholder="New Password"]');
const Confirmpass = document.querySelector('input[placeholder="Confirm New Password"]');
const changed_successfully = document.getElementById("success")
const recover_button = document.querySelector(".sign__btn")

document.addEventListener("DOMContentLoaded", function (){
    recover_button.addEventListener("click", function(){
        if(Verify.value.trim() === '' || Newpass.value.trim() === '' || Confirmpass.value.trim() === ''){
            showCustomAlert("Please fill all the blank spaces")
            return
        }
        if(Newpass.value.trim() != Confirmpass.value.trim()){
            showCustomAlert("New password and Confirmation password are not identical")
            return
        }
        changePass(Verify.value, Newpass.value)
    })
})