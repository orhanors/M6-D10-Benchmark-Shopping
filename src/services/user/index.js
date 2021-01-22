const router = require("express").Router();
const { userSchema, validateBody } = require("../../middlewares/validator");

router.post("/", validateBody(userSchema), async (req, res, next) => {
	res.send({ status: "OK", data: req.body });
});

module.exports = router;
