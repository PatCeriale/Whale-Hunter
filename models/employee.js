module.exports = function (sequelize, DataTypes) {
    var Employee = sequalize.define("Employee", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
              }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
            //TODO:Must be hidden
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
              }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: flase,
            validate: {
                len: [1]
              }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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

    Employee.associate = function (models) {
        Employee.hasOne(models.role, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Employee;
}