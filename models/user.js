const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
              }
        },
        password: DataTypes.STRING,
    })

    //Hashes password prior to putting it into the db
    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    return User;
};