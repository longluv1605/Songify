const { database } = require("../configs/configDatabase");


const getCategories = async () => {
    try {
        const result = await database.query(
            "SELECT * FROM category ORDER BY id"
        );
    
        return result.rows;
    } catch (error) {
        console.log(error.message);
    }
};

const getProductsByCategory = async (category) => {
    try {
        const result = await database.query(
            "SELECT * FROM product WHERE category = $1",
            [category]
        );
    
        return result.rows;
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    getCategories,
};
