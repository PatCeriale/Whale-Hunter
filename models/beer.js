module.exports = function (sequelize, DataTypes) {
    var Beer = sequalize.define("Beer", {
        sku: {
            DataTypes.STRING,
            allowNull: false
        },
        brewery_id: {
            DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            DataTypes.STRING,
            allowNull: false
        },
        description: {
            DataTypes.TEXT,
            allowNull: false
        },
        style_id: {
            DataTypes.INTEGER,
            allowNull: false
        },
        abv: {
            DataTypes.INTEGER,
            allowNull: false
        },
        ibu: {
            DataTypes.INTEGER,
            allowNull: false
        },
        size: {
            DataTypes.INTEGER,
            allowNull: false
        },
        picture: {
            DataTypes.STRING,
            allowNull: false
        },
        Quantity: {
            DataTypes.INTEGER,
            allowNull: false
        }
    })

    Beer.associate = function (models) {
        Beer, belongsTo(models.brewerie, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Beer;
}