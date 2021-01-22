const router = require("express").Router();
const ApiError = require("../../classes/ApiError");
const Product = require("../../db").Product;
router.post("/", async (req, res, next) => {
	try {
		const newProduct = await Product.create(req.body);
		res.status(201).json({ data: newProduct });
	} catch (error) {
		console.log("Product POST error: ", error);
		next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const allProducts = await Product.findAll();
		res.status(200).json({ data: allProducts });
	} catch (error) {
		console.log("Product GET error", error);
		next(error);
	}
});

router.get("/:productId", async (req, res, next) => {
	try {
		const foundProduct = await Product.findByPk(req.params.productId);

		if (!foundProduct) throw new ApiError(404, "Product");
		res.status(201).json({ data: foundProduct });
	} catch (error) {
		console.log("Product GETByID error", error);
		next(error);
	}
});

router.delete("/:productId", async (req, res, next) => {
	try {
		Product.destroy({ where: { id: req.params.productId } }).then(
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
