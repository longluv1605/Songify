const token = localStorage.getItem("token");
const getPlan = async() => {
    try{
        const response = await axios.get(`http://localhost:8080/api/plans`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        )
        console.log(response.data);
        loadPriceplans(response.data.plans);
        findcurrentplan(response.data.currPlan.userId)

    }  
    catch(error){
        console.log(error);
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

function findcurrentplan(id){
    let plan = document.getElementById(`plan${id}`)
    let chooseplan = plan.querySelector("button span")
    chooseplan.textContent = "Current Plan";
}

document.addEventListener("DOMContentLoaded", function(){
    getPlan();
    //loadPriceplans();
})