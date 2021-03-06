module.exports = function (sequelize, DataTypes) {
    var Rating = sequelize.define("Rating", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    })

    Rating.associate = function (models) {
        Rating.belongsTo(models.Beer, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
        Rating.belongsTo(models.User, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
    }
    return Rating;
}