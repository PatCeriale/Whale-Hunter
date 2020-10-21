module.exports = function (sequelize, DataTypes) {
    var Beer = sequalize.define("Beer", {
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
        },
        rating_id: {
            type: DataTypes.INTEGER,
            allowNull: false
            //TODO: foreign key to ratings table ID
        }
    })

    Beer.associate = function (models) {
        Beer.belongsTo(models.Brewery, {
            foreignKey: {
                allowNull: false
            }
        });
        Beer.belongsTo(models.Style, {
            foreignKey: {
                allowNull: false
            }
        });
        Beer.belongsTo(models.Rating, {
            foreignKey: {
                allowNull: false
            }
        })
    };
    return Beer;
}