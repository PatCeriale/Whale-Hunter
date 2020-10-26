module.exports = function (sequelize, DataTypes) {
    var Brewery = sequelize.define("Brewery", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.BIGINT
        },
        email: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
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

    Brewery.associate = function (models) {
        Brewery.hasMany(models.Beer);
    };
    return Brewery;
}