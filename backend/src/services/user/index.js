const router = require("express").Router();
const User = require("../../db").User;
const ApiError = require("../../classes/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//*** SIGNUP *****/
router.post("/auth/signup", async (req, res, next) => {
	try {
		const { email } = req.body;
		const foundUser = await User.findAll({ where: { email } });

		if (foundUser.length > 0)
			throw new ApiError(400, "Email already exist!");
		const newUser = await User.create(req.body);
		res.status(201).json({ data: newUser });
	} catch (error) {
		console.log("User SIGNUP error", error);
		next(error);
	}
});

//*** LOGIN *****/
router.post("/auth/login", async (req, res, next) => {
	const { email, password } = req.body;
	const { JWT_SECRET, JWT_EXPIRATION } = process.env;
	try {
		const foundUser = await User.findAll({ where: { email } });
		console.log("found user", foundUser);
		//check if the user exists
		if (!foundUser.length > 0)
			throw new ApiError(400, "Invalid credentials");

		//compare passwords from req.body and recorded database passwrd
		const recordedPassword = foundUser[0].dataValues.password;
		const isPasswordMatched = await bcrypt.compare(
			password,
			recordedPassword
		);
		if (!isPasswordMatched) throw new ApiError(400, "Invalid credentials");

		//Creating jwt payload
		const payload = {
			user: foundUser.id,
		};

		jwt.sign(
			payload,
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRATION },
			function (err, token) {
				if (err) console.log("jwt err", err);

				res.status(201).json({ data: { token, user: foundUser[0] } });
			}
		);
	} catch (error) {
		console.log("USER LOGIN error", error);
		next(error);
	}
});

router.delete("/:userId", async (req, res, next) => {
	try {
	} catch (error) {
		console.log("User POST error", error);
		next(error);
	}
});

module.exports = router;
