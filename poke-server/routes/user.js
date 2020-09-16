const router = require("express").Router();
const userAuth = require("../auth/userAuth");

router.get("/user-test", userAuth, (req, res) => {
    console.log("hey")
    return res.status(200).json({ status: "Accepted" });
});

module.exports = router
