const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
			surname: { type: DataTypes.STRING, allowNull: false },
			username: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.STRING, allowNull: false },
			role: { type: DataTypes.STRING, allowNull: false, defaultValue: 0 },
		},
		{ timestamps: false }
	);

	User.associations = (models) => {
		User.belongsToMany(models.Product, {
			through: { model: models.Cart, unique: false },
		});
		User.hasMany(models.Cart);
	};

	User.addHook("beforeValidate", async function (user, options) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	});

	return User;
};
