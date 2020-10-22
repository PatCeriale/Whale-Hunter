module.exports = function (sequelize, DataTypes) {
    var Rating = sequelize.define("Rating", {})
    Rating.associate = function (models) {
        Rating.belongsTo(models.User, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
        Rating.belongsTo(models.Beer, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
        return Rating;
    }
}