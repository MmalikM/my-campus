'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Campus.hasMany(models.Exam,{
        foreignKey:"PTN"
      })
      Campus.hasMany(models.Invitee,{
        foreignKey:"IdUniversitas"
      })
    }
  }
  Campus.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    namaPTN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "name PTN cannot be null",
        notEmpty: "name PTN cannot be Empty",
      },
    },
    idKampus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "stock cannot be null",
        notEmpty: "stock cannot be Empty",
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "image URL cannot be null",
        notEmpty: "image URL cannot be Empty",
      },
    },
  }, {
    sequelize,
    modelName: 'Campus',
  });
  return Campus;
};