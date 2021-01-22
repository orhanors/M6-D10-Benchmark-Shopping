const { Sequelize, DataTypes } = require("sequelize");

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
	host: PGHOST,
	dialect: "postgres",
});

const models = {
	User: require("./models/user")(sequelize, DataTypes),
	Product: require("./models/product")(sequelize, DataTypes),
	Review: require("./models/review")(sequelize, DataTypes),
	Category: require("./models/category")(sequelize, DataTypes),
	Cart: require("./models/cart")(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
	if ("associations" in models[modelName]) {
		models[modelName].associations(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
	.authenticate()
	.then(() => console.log("Connected to DB..."))
	.catch((e) => console.log("DB connection failed: ", e));

module.exports = models;
