module.exports = function (sequelize, DataTypes) {
    var Sixpack = sequelize.define("Sixpack", {
        name: {
            type: DataTypes.STRING,
            //TODO: Change back to false before deployment
            allowNull: true,
            validate: {
                len: [1]
              }
        }
        //Removing this feature to be added in if time is allowed
        // drank: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: true
        // },
        // drink_date: {
        //     type: DataTypes.DATE
        // }
    })

    Sixpack.associate = function (models) {
        Sixpack.belongsToMany(models.Beer, {
            through:"sixPackBeer"
        });
        Sixpack.belongsTo(models.Customer, {
            foreignKey: {
                //TODO: Change back to false before deployment
                allowNull: true
            }
        })
    };
    return Sixpack;
}