'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      jurusan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      NRM: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      PTN: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Campuses",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      jenjang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenis: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenis: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dayaTampung: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pendaftar: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      portofolio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exams');
  }
};