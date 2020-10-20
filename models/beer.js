module.exports = function (sequelize, DataTypes) {
    var Beer = sequalize.define("Beer", {
        sku: {
<<<<<<< HEAD
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
=======
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
>>>>>>> dev
            allowNull: false
        }
    })

    Beer.associate = function (models) {
<<<<<<< HEAD
        Beer.belongsTo(models.brewery, {
=======
        Beer, belongsTo(models.brewerie, {
>>>>>>> dev
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Beer;
}