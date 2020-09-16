const firebase = require("./firebase");

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        req.authToken = req.headers.authorization.split(" ")[1];
    } else {
        req.authToken = null;
    }

    next();
};

// authentication controller
const userAuth = (req, res, next) => {
    console.log("userAuth")
    getAuthToken(req, res, () => {
        console.log("getAuthToken");
        const { authToken } = req;
        firebase
            .auth()
            .verifyIdToken(authToken)
            .then((userInfo) => {
                console.log(userInfo);
                req.authId = userInfo.uid;
                return next();
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(401)
                    .send({ error: "You are not authorized." });
            });
    });
};

module.exports = userAuth;
