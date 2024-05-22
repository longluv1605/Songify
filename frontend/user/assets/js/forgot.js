const sendCode = async (email) => {
  try {
    // console.log(email);
    const response = await axios.get(
      "http://localhost:8080/api/password/forgot/send_code",
      {
        params : {
            email: email
        }
      }
    );
    // console.log(response);
    window.location.href = "http://localhost:3000/changepass";
  } catch (error) {
    // console.log("lỗi rồi", error);
    changed_successfully.style.display = "block";
  }
};

function isValidGmail(email) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng của email
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
  return gmailRegex.test(email);
}

const userEmail = document.querySelector(
  'input[placeholder="Insert your email"]'
);
const recover_button = document.querySelector(".sign__btn");
const changed_successfully = document.getElementById("success");
document.addEventListener("DOMContentLoaded", function () {
  recover_button.addEventListener("click", function () {
    if (userEmail.value.trim() === "") {
      showCustomAlert("Please fill all the blank spaces");
      return;
    }
    if (!isValidGmail(userEmail.value)) {
      showCustomAlert("Invalid email syntax");
      return;
    }
    sendCode(userEmail.value);
  });
});
