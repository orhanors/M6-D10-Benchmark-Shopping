const router = require("express").Router();

const usersRoute = require("./user");
const productsRoute = require("./product");
const reviewsRoute = require("./review");
const cartRoute = require("./cart");

router.use("/users", usersRoute);
router.use("/products", productsRoute);
router.use("/reviews", reviewsRoute);
router.use("/cart", cartRoute);

module.exports = router;
