const modelComment = require("../models/comment.js");
const commonHelper = require("../helper/common");
require("dotenv").config();

const postComment = async (req, res, next) => {
    try {
        const { user_id, article_id, comment } = req.body;
        const data = {
            user_id,
            article_id,
            comment
        };
        const result = await modelComment.postComment(data);
        commonHelper.reponse(res, result, 200);

    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const getCommentByArtID = async (req, res, next) => {
    try {
        const id = req.params.id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1000;
        const offset = (page - 1) * limit;
        const order = req.query.order || "asc";     //biar comment lama di atas
        const sort = req.query.sort || "comment.id";    //pake id karna lupa bikin field created_at
        const result = await modelComment.getCommentByArtID({ limit, offset, order, sort, id });
        const resultCount = await modelComment.countComment(id);
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
    postComment,
    getCommentByArtID
}