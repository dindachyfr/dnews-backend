const midUser = (req, res, next) => {
    const { phone_number, email, password } = req.body;
    if (!phone_number || !email || !password) {
        const errorRes = new Error("Please fill in all forms!");
        errorRes.status = 400;
        next(errorRes);
    } else { next(); }
};

const midUser2 = (req, res, next) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        const errorRes = new Error("Please fill in all forms!");
        errorRes.status = 400;
        next(errorRes);
    } else { next(); }
};

const midProfile = (req, res, next) => {
    const {username, email, job, name, password, about} = req.body
    if(!username || !email || !password) {
        const errorRes = new Error("Please fill in all forms!");
        errorRes.status = 400;
        next(errorRes);
    } else { next(); }
}

const midArticle = (req, res, next) => {
    const {user_id, title, cat_name, content} = req.body
    if(!title || !content || !cat_name || !user_id) {
        const errorRes = new Error("Please fill in all forms!");
        errorRes.status = 400;
        next(errorRes);
    } else { next(); }
}

module.exports = { midUser, midUser2, midProfile, midArticle }