module.exports = function (sequelize, DataTypes) {
    var SixPack = sequelize.define("SixPack", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
              }
        },
        drank: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        drink_date: {
            type: DataTypes.DATETIME
        }
    })

    SixPack.associate = function (models) {
        SixPack.belongsTo(models.beer, {
            foreignKey: {
                allowNull: false
            }
        });
        SixPack.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        })
    };
    return SixPack;
}