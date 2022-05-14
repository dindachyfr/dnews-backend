const connection = require("../config/db");

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user WHERE email = ?", email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const userDisplay = (email) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, name, phone_number, email, role, profile_picture FROM user WHERE email = ?", email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const createAccount = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO user SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateUser = (dataUser, id) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE user SET ? WHERE id = ?", [dataUser, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getUserByID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT name, username, role, about, email, profile_picture from user  WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateRole = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE user SET ? WHERE id = ?", [data, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}




module.exports = {
  findByEmail,
  userDisplay,
  createAccount,
  updateUser,
  getUserByID,
  updateRole
}