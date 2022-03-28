const modelSaved = require("../models/saved.js");
const commonHelper = require("../helper/common");
require("dotenv").config();

const postSaved = async (req, res, next) => {
    try {
        const { user_id, article_id } = req.body;
        const data = {
            user_id,
            article_id
        };
        const slotAvailability = await modelSaved.findByData({ user_id, article_id });
        if (slotAvailability.length > 0) {
            const errorRes = new Error("You already bookmarked this!");
            errorRes.status = 403;
            next(errorRes);
        } else {
            const result = await modelSaved.postSaved(data);
            commonHelper.reponse(res, result, 200);
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const getSavedPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const filter = req.query.filter || "";
        const order = req.query.order || "DESC";
        const sort = req.query.sort || "updated";
        const result = await modelSaved.getSavedPosts({ filter, limit, offset, order, sort });
        const resultCount = await modelSaved.countSaved();
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

const getSavedPostsByUserID = async (req, res, next) => {
    try {
        const UID = req.params.user_id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const filter = req.query.filter || "";
        const order = req.query.order || "DESC";
        const sort = req.query.sort || "updated";
        const result = await modelSaved.getSavedPostsByUserID({ filter, limit, offset, order, sort, UID });
        const resultCount = await modelSaved.countSaved();
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

const deleteSaved = async (req, res, next) => {
    try{
        const UID = req.params.user_id
        const id = req.params.id
        const result = await modelSaved.deleteSaved({UID, id})
        commonHelper.reponse(res, result, 200, "Article has been successfully removed from your bookmarks");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
}


module.exports = {
    postSaved,
    getSavedPosts,
    getSavedPostsByUserID,
    deleteSaved
}