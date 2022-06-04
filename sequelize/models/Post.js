module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define("post", {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_id: {
        type: DataTypes.BIGINT,
        validate: {
          notEmpty : true,
        }
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: "1",
      },
    });
   
    return post;
  };
  