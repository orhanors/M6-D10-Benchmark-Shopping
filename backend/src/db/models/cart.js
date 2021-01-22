module.exports = (sequelize, DataTypes) => {
	const Cart = sequelize.define(
		"cart",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{ timestamps: false }
	);
	Cart.associations = (models) => {
		Cart.belongsTo(models.User);
		Cart.belongsTo(models.Product);
	};
	return Cart;
};
