module.exports = function (sequelize, DataTypes) {
    var Beer = sequelize.define("Beer", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        abv: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ibu: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Beer.associate = function (models) {
        Beer.belongsTo(models.Brewery, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
        Beer.belongsTo(models.Style, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
        Beer.belongsTo(models.Rating, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
    };
    return Beer;
}
