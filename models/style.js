module.exports = function (sequelize, DataTypes) {
    var Style = sequelize.define("Style", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
              }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
    return Style;
}