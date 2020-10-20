module.exports = function (sequelize, DataTypes) {
    var Beer = sequalize.define("Beer", {
        sku: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brewery_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        style_id: {
            type: DataTypes.INTEGER,
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
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Beer.associate = function (models) {
        Beer.belongsTo(models.brewery, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Beer;
}