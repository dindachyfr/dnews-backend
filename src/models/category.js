const connection = require("../config/db");

const countCats = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT COUNT (*) AS total FROM category", (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const getCats = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM category LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};


module.exports = {
    countCats,
    getCats
}