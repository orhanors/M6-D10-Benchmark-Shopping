module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define("review", {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		comment: { type: DataTypes.STRING, allowNull: false },
		rate: { type: DataTypes.INTEGER, allowNull: false },
	});

	Review.associations = (models) => {
		Review.belongsTo(models.User);
		Review.belongsTo(models.Product);
	};

	return Review;
};
