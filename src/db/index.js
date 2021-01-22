const Joi = require("joi");

exports.validateUser = Joi.object().keys({
	firstName: Joi.string().required(),
	lasName: Joi.string().required(),
});

exports.validateBody = (req, res, next) => {
	const result = Joi.validate(req.body, schema);
	if (result.error) return res.status(400).json({ errors: result.errors });
	if (!req.value) {
		req.value = {};
	}
	req.value["body"] = result.value;
	next();
};
