const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ api: "Api running" });
});

module.exports = router;
