const connection = require("../config/db");

const countArticles = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT (*) AS total FROM article", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getArticles = ({ filter, limit, offset, order, sort }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT article.id, article.title, article.cat_name, article.content, article.likes, article.updated, 
    article.status, article.pic,
    user.name as author from article join user on (article.user_id = user.id) WHERE title LIKE '%${filter}%' 
    ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};


const getArticlesByCat = ({ filter, limit, offset, order, sort, category }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT article.id, article.title, article.cat_name, article.content, article.likes, article.updated, 
    article.status, article.pic,
    user.name as author from article join user on (article.user_id = user.id) WHERE title LIKE '%${filter}%' AND cat_name = ? 
    ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`,category, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getArticlesByID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT article.id, article.title, article.cat_name, article.content, article.likes, article.updated, 
    article.status, article.pic,
    user.name as author FROM article JOIN user ON (article.user_id = user.id) where article.id = ?`, id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateStatus = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE article SET ? WHERE id = ?", [data, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}

const likeArticle = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE article SET likes = likes + 1 WHERE id = ?",  id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}

const dislikeArticle = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE article SET likes = likes - 1 WHERE id = ?",  id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}


const postArticle = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO article SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateArticle = ({data, id}) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE article SET ? WHERE id = ?", [data, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};


module.exports = {
    countArticles,
    getArticles,
    getArticlesByCat,
    getArticlesByID,
    updateStatus,
    likeArticle,
    postArticle,
    dislikeArticle,
    updateArticle
}