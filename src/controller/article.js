const modelArticles = require("../models/articles.js");
const commonHelper = require("../helper/common");
require("dotenv").config();

const getArticles = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2000;
        const offset = (page - 1) * limit;
        const filter = req.query.filter || "";
        const order = req.query.order || "DESC";
        const sort = req.query.sort || "updated";
        const result = await modelArticles.getArticles({ filter, limit, offset, order, sort });
        const resultCount = await modelArticles.countArticles();
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

const getArticlesByCat = async (req, res, next) => {
    try {
        const category = req.params.category
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2000;
        const offset = (page - 1) * limit;
        const filter = req.query.filter || "";
        const order = req.query.order || "DESC";
        const sort = req.query.sort || "updated";
        const result = await modelArticles.getArticlesByCat({ filter, limit, offset, order, sort, category });
        const resultCount = await modelArticles.countArticles();
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

const getArticlesByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const [result] = await modelArticles.getArticlesByID(id);
      commonHelper.reponse(res, result, 200, null);
    } catch (error) {
      const errorRes = new Error("Internal Server Error");
      errorRes.status = 500;
      console.log(error);
      next(errorRes);
    }
  };

  const updateStatus = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = {
            status: "published"
        }
        const result = modelArticles.updateStatus(id, data)
        commonHelper.reponse(res, result, 200, "Article has been successfully published");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
}

const likeArticle = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = modelArticles.likeArticle(id)
        commonHelper.reponse(res, result, 200, "Article has been successfully liked");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
}

const dislikeArticle = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = modelArticles.dislikeArticle(id)
        commonHelper.reponse(res, result, 200, "Article has been successfully unliked");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
}


const postArticle = async (req, res, next) => {
    try {
      const { user_id, pic, title, cat_name, content } = req.body;
      const fileName = req.file.filename; // `${req.get("host")} kalo mau dinamis
      const data = {
        user_id,
        title, 
        cat_name, 
        content,
        pic: `http://localhost:5000/file/${fileName}`
      };
        const result = await modelArticles.postArticle(data);
        commonHelper.reponse(res, result, 200);
    } catch (error) {
      const errorRes = new Error("Internal Server Error");
      errorRes.status = 500;
      console.log(error);
      next(errorRes);
    }
  };

  const updateArticle = async (req, res, next) => {
    try {
      const { pic, title, cat_name, content } = req.body;
      const id = req.params.id
      const fileName = req.file.filename; // `${req.get("host")} kalo mau dinamis
      const data = {
        title, 
        cat_name, 
        content,
        pic: `http://localhost:5000/file/${fileName}`
      };
        const result = await modelArticles.updateArticle({data, id});
        commonHelper.reponse(res, result, 200);
    } catch (error) {
      const errorRes = new Error("Internal Server Error");
      errorRes.status = 500;
      console.log(error);
      next(errorRes);
    }
  };

module.exports = {
    getArticles,
    getArticlesByCat,
    getArticlesByID,
    updateStatus,
    likeArticle,
    postArticle,
    dislikeArticle,
    updateArticle
}