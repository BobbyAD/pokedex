const router = require("express").Router();

const pokeRouter = require("../routes/pokeapi");

router.use("/pokeapi", pokeRouter);

router.get("/", (req, res) => {
    res.json({ api: "Api running" });
});

module.exports = router;
