module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define(
		"category",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);

	Category.associations = (models) => {
		Category.hasMany(models.Product);
	};

	return Category;
};
