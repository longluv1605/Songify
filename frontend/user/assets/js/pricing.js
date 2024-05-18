const token = localStorage.getItem("token");
const today = new Date();
const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
let expire = ""
let had_plan = false

const getPlan = async() => {
    try{
        const response = await axios.get(`http://localhost:8080/api/plans`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log(response.data);
        loadPriceplans(response.data.plans);
        let expire_date = new Date(response.data.currPlan.result[0].exp_date)
        expire = response.data.currPlan.result[0].exp_date
        if(expire_date >= endOfToday){
            findcurrentplan(response.data.currPlan.result[0].plan_id)
            had_plan = true
        }
    }  
    catch(error){
        showCustomAlert(error.response.data.message);
    }
};

function loadPriceplans(datas){
    datas.forEach((data, index) => {
        let plan = document.getElementById(`plan${index+1}`)
        let name = plan.querySelector(".plan__title");
        let price = plan.querySelector(".plan__price");
        let duration = plan.querySelector(".plan__list li:nth-child(1)")
        let resolution = plan.querySelector(".plan__list li:nth-child(2)")
        let offer1 = plan.querySelector(".plan__list li:nth-child(3)")
        let offer2 = plan.querySelector(".plan__list li:nth-child(4)")
        let offer3 = plan.querySelector(".plan__list li:nth-child(5)")
        let chooseplan = plan.querySelector("button span")

        name.textContent = data.name
        price.textContent = "$" + data.price
        duration.textContent = data.duration + " days"
        resolution.textContent = data.film_quality
        let str = data.description;
        let words = str.split(/[\n-]/).filter(word => word.trim() !== '');
        
        offer1.textContent = words[0]; // Lấy từ đầu tiên
        offer2.textContent = words[1]; // Lấy từ thứ hai
        offer3.textContent = words[2]; // Lấy từ thứ ba
        chooseplan.textContent = "Choose plan"

        // console.log(name.textContent, price.textContent, duration.textContent, 
        //     resolution.textContent, offer1.textContent, offer2.textContent, offer3.textContent);
        // console.log(data);
    })
}

const purchase = async(id, payment_method) =>{
    try{
        // console.log({"planId": id, "paymentMethod": payment_method})
        // console.log("buying");
        const response =  await axios.post(`http://localhost:8080/api/plans`,
        {"planId": id, "paymentMethod": payment_method},
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log(response);
        window.location.reload()
    }
    catch(error){
        console.log(error);
    }
}

function findcurrentplan(id){
    let plan = document.getElementById(`plan${id}`)
    let chooseplan = plan.querySelector("button span")
    chooseplan.textContent = "Current Plan";
}

const buy_plan = document.querySelector(".sign__btn.sign__btn--modal")

document.addEventListener("DOMContentLoaded", function(){
    getPlan();
    buy_plan.addEventListener("click",function(){
        if(had_plan){
            var modal = document.getElementById("plan-modal");
            var bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
            showCustomAlert("Your plan has not expired yet! Expire date is: " + expire.slice(0,10))
            return
        }
        let option = document.getElementById("value")
        let selected = option.value
        let selectedValueInt = parseInt(selected, 10);
        // console.log("id: ", selected)
        let payment_method = document.querySelectorAll('input[name="type"]')
        let saved_method = ""
        payment_method.forEach((method) => {
            if(method.checked) {
                let label = method.nextElementSibling;
                saved_method = label.textContent
            }
        })
        // console.log("payment method: " , saved_method);
        purchase(selectedValueInt, saved_method)
    })
})