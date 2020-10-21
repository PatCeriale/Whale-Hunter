module.exports = function (sequelize, DataTypes) {
    var Rating = sequalize.define("Rating", {
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
              }
        }
    })
    return Rating;
}