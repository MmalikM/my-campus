'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      User.belongsToMany(models.Exam,{
        through: models.Favourite,
        foreignKey: "UserId"
      })
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
      notNull:"name cannot be null",
      notEmpty: "name cannot be Empty"
    },
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg:"email used"},
      validate:{
        isEmail: {
          msg: "not email format"
        },
        notNull:{
          msg:"email cannot be null"
        },
        notEmpty: {
          msg:"email cannot be Empty"
        }

    },
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
      notNull:"password cannot be null",
      notEmpty: "password cannot be Empty",
      minPassword(password){
        if (password.length < 5) throw new Error('minimum password 5 digit')
      }
    },
  },
    school:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
      notNull:"school cannot be null",
      notEmpty: "school cannot be Empty"
    },
  },
    studentClass: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notNull:"class cannot be null",
      notEmpty: "class cannot be Empty"
    },
  },
  isSubscribed:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user,option)=>{
    user.password = hashPassword(user.password)
    user.isSubscribed = false
  })
  return User;
};