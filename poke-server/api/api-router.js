const router = require("express").Router();

const pokeRouter = require("../routes/pokeapi");
const userRouter = require("../routes/user");

router.use("/pokeapi", pokeRouter);

router.use("/user", userRouter);

router.get("/", (req, res) => {
    res.json({ api: "Api running" });
});

module.exports = router;
