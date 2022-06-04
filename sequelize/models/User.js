const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    age: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    terms: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    status: {
      type: DataTypes.TINYINT,
      defaultValue: "1",
    },
  });

  //  user.beforeCreate(async (user) => {
  //   user.password = await user.generatePasswordHash();
  // });
  // user.prototype.generatePasswordHash = function () {
  //   if (this.password) {
  //     return bcrypt.hash(this.password, 10);
  //   }
  // };
  
  return user;
};
