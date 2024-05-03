const axios = require('axios').default;


const url = "http://localhost:8000/api/";

const getCategories = async () => {
    const response = axios.get(url);
	return response
        
};

// const data = getCategories();
data = getCategories();

console.log(">>>>>data>>>>", data);
// data.then((data) => {
// 	console.log(data) // "Some User token"
// })
