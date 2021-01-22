module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define({
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
		brand: { type: DataTypes.STRING, allowNull: false },
		imageUrl: { type: DataTypes.STRING },
		price: { type: DataTypes.INTEGER, allowNull: false },
	});
};
