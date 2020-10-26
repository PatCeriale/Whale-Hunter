module.exports = function (sequelize, DataTypes) {
    var Beer = sequelize.define("Beer", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        abv: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        ibu: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
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
        Beer.hasMany(models.Rating, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        });
    };
    return Beer;
}
