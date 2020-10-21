module.exports = function (sequelize, DataTypes) {
    var Role = sequalize.define("Role", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Role;
}