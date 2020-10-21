module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
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
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zip_code: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        }
    })
    return Customer;
}