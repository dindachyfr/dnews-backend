const connection = require("../config/db");

const postComment = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO comment SET ?", data, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const countComment = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT COUNT (*) AS total FROM comment where user_id = ?", id, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const getCommentByArtID = ({ limit, offset, order, sort, id }) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT comment.id as no, comment.article_id, user.username, user.profile_picture,
        comment.comment from comment join user on (comment.user_id = user.id) WHERE comment.article_id = ? 
      ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, id, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};



module.exports = {
    postComment,
    countComment,
    getCommentByArtID
}