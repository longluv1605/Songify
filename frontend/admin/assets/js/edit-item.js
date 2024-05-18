function changeAdminName(data){
    var name = document.getElementById("add-name-of-admin");
    name.innerText = data.first_name + " " + data.last_name;
};

document.addEventListener('DOMContentLoaded', function(){
    axios.get('http://localhost:8080/api/admin/profile', 
        {
            headers: {Authorization: `Bearer ${localStorage.getItem('token_admin')}`}
        }
    ).then(response => {
        const data = response.data.data[0];
        changeAdminName(data);
    }).catch(error => {
        showCustomAlert(error.response.data.message);
    });
});