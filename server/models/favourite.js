'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favourite.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Favourite.belongsTo(models.Exam, {
        foreignKey: "CampusId",
      });
    }
  }
  Favourite.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "userId cannot be null",
        notEmpty: "userId cannot be Empty",
      },
    },
    CampusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "Campus ID cannot be null",
        notEmpty: "Campus ID cannot be Empty",
      },
    },
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};