const services = require('../services/CRUDservices');


const getHomePage = async (req, res) => {
    const result = await services.getCategories();
    res.json(result);
};

module.exports = {
    getHomePage,
}