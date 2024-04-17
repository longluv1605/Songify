console.log("Hello, this is JavaScript!");
/*
var imagePath = "assets/book.png";
var images = document.getElementsByClassName('cate-picture')

for (var i = 0; i < images.length; i++) {
    images[i].src = imagePath;
}
*/
/*
categorize_data = axios.get('api_endpoint').parseJSON()

document.getElementById().write( 
    <h1>categorize_data[0]</h1>
)
*/
/*
const catedata= "json/singlecate.json"

fetch(catedata)
    .then(response => {
        if(!response.ok) {
            throw new Error("Response was not okay");
        }
        return response.json();
    })
    .then(data =>{
        imagePath = data.category[0];
        images = document.getElementsByClassName('cate-picture');
        i = 0
        for(const link in imagePath){
            images[i].src = imagePath[link];
            i++;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    */

    const catedata= "json/singlecate.json"
    imagePath = catedata.category[0];
    images = document.getElementsByClassName('cate-picture');
    i = 0
    for(const link in imagePath){
        images[i].src = imagePath[link];
        i++;
    }