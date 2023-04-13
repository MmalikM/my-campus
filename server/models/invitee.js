"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitee.belongsTo(models.Campus,{
        foreignKey:"IdUniversitas"
      })
    }
  }
  Invitee.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "name cannot be null",
          notEmpty: "name cannot be Empty",
        },
      },
      IdUniversitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "University ID cannot be null",
          notEmpty: "University ID cannot be Empty",
        },
      },
      nilai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "nilai cannot be null",
          notEmpty: "nilai cannot be Empty",
        },
      },
    },
    {
      sequelize,
      modelName: "Invitee",
    }
  );
  return Invitee;
};
