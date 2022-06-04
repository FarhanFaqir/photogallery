module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("comment", {
      comment: {
        type: DataTypes.STRING,
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
      post_id: {
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
   
    return comment;
  };
  