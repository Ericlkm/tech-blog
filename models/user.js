const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userPass) => {
        userPass.password = await bcrypt.hash(userPass.password, 10);
        return userPass;
      },
      beforeUpdate: async (updatedUserPass) => {
        if (updatedUserPass.password) {
          updatedUserPass.password = await bcrypt.hash(
            updatedUserPass.password,
            10
          );
        }
        return updatedUserPass;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
