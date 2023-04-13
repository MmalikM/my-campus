'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exam.belongsToMany(models.User,{
        through: models.Favourite,
        foreignKey: "CampusId"
      })
      Exam.belongsTo(models.Campus,{
        foreignKey:"PTN"
      })
    }
  }
  Exam.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    kode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "code cannot be null",
        notEmpty: "code cannot be Empty",
      },
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "jurusan cannot be null",
        notEmpty: "jurusan cannot be Empty",
      },
    },
    NRM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "NRM cannot be null",
        notEmpty: "NRM cannot be Empty",
      },
    },
    PTN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "id university cannot be null",
        notEmpty: "id university cannot be Empty",
      },
    },
    jenjang: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "jenjang cannot be null",
        notEmpty: "jenjang cannot be Empty",
      },
    },
    jenis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "jenis cannot be null",
        notEmpty: "jenis cannot be Empty",
      },
    },
    jenis: DataTypes.STRING,
    dayaTampung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "Daya Tampung cannot be null",
        notEmpty: "Daya Tampung cannot be Empty",
      },
    },
    pendaftar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "pendaftar cannot be null",
        notEmpty: "pendaftar cannot be Empty",
      },
    },
    portofolio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "portofolio cannot be null",
        notEmpty: "portofolio cannot be Empty",
      },
    },
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};