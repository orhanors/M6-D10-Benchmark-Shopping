const { Sequelize, DataTypes } = require("sequelize");

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
	host: PGHOST,
	dialect: "postgres",
});

sequelize
	.authenticate()
	.then(() => console.log("Connected to DB..."))
	.catch((e) => console.log("DB connection failed: ", e));
