const router = require("express").Router();
const Review = require("../../db").Review;
const Product = require("../../db").Product;
const User = require("../../db").User;

router.post("/:productId/add-review/:userId", async (req, res, next) => {
	try {
		const { productId, userId } = req.params;

		//Check if the user exist
		const foundUser = await User.findByPk(userId);
		if (!foundUser) throw new ApiError(404, "User");

		//Check if the product exist
		const foundProduct = await Product.findByPk(productId);
		if (!foundProduct) throw new ApiError(404, "Product");

		//Create new review
		const data = { ...req.body, productId, userId };
		const newReview = await Review.create(data);
		res.status(201).json({ data: newReview });
	} catch (error) {
		console.log("Review POST error", error);
		next(error);
	}
});

router.get("/:productId", async (req, res, next) => {
	try {
		const { productId } = req.params;
		const foundProduct = await Product.findByPk(productId);
		if (!foundProduct) throw new ApiError(404, "Product");

		const productReviews = await Review.findAll({
			where: { productId },
		});
		res.status(200).json({ data: productReviews });
	} catch (error) {
		console.log("Review GET error", error);
		next(error);
	}
});

router.delete("/:reviewId", async (req, res, next) => {
	try {
		Review.destroy({ where: { id: req.params.reviewId } }).then(
			(rowsDeleted) => {
				if (rowsDeleted > 0)
					return res.status(200).json({ data: "OK" });
				next(new ApiError(404, "Article"));
			}
		);
	} catch (error) {
		console.log("Review DELETE error", error);
		next(error);
	}
});

module.exports = router;
