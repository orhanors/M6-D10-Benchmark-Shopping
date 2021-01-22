const router = require("express").Router();

const usersRoute = require("./user");
const imageUploadRoute = require("./image");
router.use("/users", usersRoute);
router.use("/image", imageUploadRoute);

module.exports = router;
