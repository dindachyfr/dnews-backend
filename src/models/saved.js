const connection = require("../config/db");

const postSaved = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO saved_post SET ?", data, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const findByData = ({user_id, article_id}) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM saved_post WHERE user_id = ? and article_id = ?", [user_id, article_id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  };
  
const countSaved = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT COUNT (*) AS total FROM saved_post", (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const getSavedPosts = ({ filter, limit, offset, order, sort }) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT saved_post.id as no, article.id as article_id, article.title, article.cat_name, article.content, article.likes, article.updated, 
      article.status, article.pic,
      user.name as owner from saved_post join user on (saved_post.user_id = user.id) 
      join article on (saved_post.article_id = article.id) WHERE title LIKE '%${filter}%' 
      ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const getSavedPostsByUserID = ({ filter, limit, offset, order, sort, UID }) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT saved_post.id as no, article.id as article_id, article.title, article.cat_name, article.content, article.likes, article.updated, 
      article.status, article.pic,
      user.name as owner from saved_post join user on (saved_post.user_id = user.id) 
      join article on (saved_post.article_id = article.id) WHERE title LIKE '%${filter}%' and user.id = ? 
      ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, UID, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const deleteSaved = ({UID, id}) => {
    return new Promise ((resolve, reject) => {
        connection.query("DELETE FROM saved_post WHERE article_id = ? AND user_id = ?", [id, UID], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};


module.exports = {
    postSaved,
    countSaved,
    getSavedPosts,
    getSavedPostsByUserID,
    findByData,
    deleteSaved
}