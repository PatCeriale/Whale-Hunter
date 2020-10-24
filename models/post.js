module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        user_name: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
              }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        beer_name: {
            type: DataTypes.STRING
        },
        brewery_name: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING            
        }
    })
    return Post;
}