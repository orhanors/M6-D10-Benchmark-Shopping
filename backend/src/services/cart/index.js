const router = require("express").Router();
const Cart = require("../../db").Cart;
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const User = require("../../db").User;
const { Sequelize } = require("sequelize");
router.get("/:userId", async (req, res, next) => {
	try {
		const foundUser = await User.findByPk(req.params.userId);
		if (!foundUser) throw new ApiError(404, "User");

		const cart = await Cart.findAll({
			include: [{ model: Product, include: Category }, User],
			attributes: [
				[
					Sequelize.fn("count", Sequelize.col("productId")),
					"unitary_qty",
				],

				[Sequelize.fn("sum", Sequelize.col("product.price")), "total"],
			],
			group: ["product.id", "product->category.id", "user.id"],
			where: { userId: req.params.userId },
		});

		const qty = await Cart.count();
		const total = await Cart.sum("product.price", {
			include: { model: Product, attributes: [] },
		});

		res.status(200).json({ data: { products: cart, qty, total } });
	} catch (error) {
		console.log("Cart GET error: ", error);
		next(error);
	}
});

router.post("/:userId/add/:productId", async (req, res, next) => {
	try {
		const { userId, productId } = req.params;
		const foundUser = await User.findByPk(userId);
		if (!foundUser) throw new ApiError(404, "User");

		//Check if the product exist
		const foundProduct = await Product.findByPk(productId);
		if (!foundProduct) throw new ApiError(404, "Product");

		const data = { userId, productId };

		const newItem = await Cart.create(data);
		res.status(201).json({ data: newItem });
	} catch (error) {
		console.log("Cart POST error: ", error);
		next(error);
	}
});

module.exports = router;
