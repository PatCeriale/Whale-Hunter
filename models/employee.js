const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        user_name: {
            type: DataTypes.STRING,
            unique: true
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
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
    //Hashes password prior to putting it into the db
    Employee.beforeCreate(function(employee){
        employee.password = bcrypt.hashSync(employee.password, bcrypt.genSaltSync(10), null);
    })

    return Employee;
}