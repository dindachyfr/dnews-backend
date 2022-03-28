const modelCats = require("../models/category.js");
const commonHelper = require("../helper/common");
require("dotenv").config();

const getCats = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const offset = (page - 1) * limit;
        const result = await modelCats.getCats({ limit, offset });
        const resultCount = await modelCats.countCats();
        const { total } = resultCount[0];
        console.log(total);
        commonHelper.reponse(res, result, 200, null, {
            currentPage: page,
            limit: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
        });
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

module.exports = {
    getCats
}