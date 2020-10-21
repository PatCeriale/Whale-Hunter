module.exports = function (sequelize, DataTypes) {
    var Brewery = sequelize.define("Brewery", {
        brewery_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
              }
        },
        address_1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address_2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING,
            allowNull: flase
        },
        state: {
            type: DataTypes.STRING,
            allowNull: flase
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: flase
        },
        phone: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.STRING,
            allowNull: flase
        }
    })

    Brewery.associate = function (models) {
        Brewery.hasMany(models.Beer);
    };
    return Beer;
}