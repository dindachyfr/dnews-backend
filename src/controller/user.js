const modelUsers = require("../models/user.js");
const commonHelper = require("../helper/common");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const [user] = await modelUsers.findByEmail(email);
        const [userDisplay] = await modelUsers.userDisplay(email);
        console.log(user);

        const passwordMatches = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        console.log(passwordMatches);
        if (!passwordMatches) {
            const errorRes = new Error("You entered the wrong email / password!");
            errorRes.status = 403;
            return next(errorRes);
        } else {
            const secretKey = process.env.SECRET_KEY;
            const payload = {
                email: user.email,
                name: user.name,
                role: user.role,
                id: user.id
            };
            // console.log(payload);
            const tokenExpiration = {
                expiresIn: 60 * 60 * 72
            };
            const token = jwt.sign(payload, secretKey, tokenExpiration);
            userDisplay.token = token;
            commonHelper.reponse(res, [userDisplay, token], 200, "Login Success");
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { email, password, phone_number } = req.body;
        const emailavailablitiy = await modelUsers.findByEmail(email);

        if (emailavailablitiy.length > 0) {
            const errorRes = new Error("Email already exist!");
            errorRes.status = 403;
            next(errorRes);
        } else {
            const passwordHashed = await bcrypt.hash(password, 10);
            const data = {
                phone_number,
                email,
                password: passwordHashed
            };
            const accountCreated = await modelUsers.createAccount(data);
            commonHelper.reponse(res, [accountCreated], 201, "Account has been successfully created");
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { username, email, job, name, password, about } = req.body;
        // const { pin } = req.body;
        const passwordHashed = await bcrypt.hash(password, 10);
        const dataUser = {
            username,
            email,
            job,
            name,
            password: passwordHashed,
            about
        };
        const result = await modelUsers.updateUser(dataUser, id);
        commonHelper.reponse(res, result, 200, "Profile has been successfully updated");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const updatePPUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fileName = req.file.filename; // `${req.get("host")} kalo mau dinamis
        const dataUser = {
            profile_picture: `http://localhost:5000/file/${fileName}`
        };

        const result = await modelUsers.updateUser(dataUser, id);
        commonHelper.reponse(res, [dataUser, result], 200, "Profile has been successfully updated");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const getUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [result] = await modelUsers.getUserByID(id);
        commonHelper.reponse(res, result, 200, null);
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const email = req.email;
        const [result] = await modelUsers.findByEmail(email);
        commonHelper.reponse(res, result, 200, null);
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
};

const updateRole = async (req, res, next) => {
    try {
        const id = req.params.id
        const dataUser = {
            role: "author"
        }
        const result = modelUsers.updateRole(id, dataUser)
        commonHelper.reponse(res, result, 200, "Profile has been successfully updated");
    } catch (error) {
        const errorRes = new Error("Internal Server Error");
        errorRes.status = 500;
        console.log(error);
        next(errorRes);
    }
}


module.exports = {
    loginUser,
    registerUser,
    updateUser,
    updatePPUser,
    getUserByID,
    getProfile,
    updateRole
}