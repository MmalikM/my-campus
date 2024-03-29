'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jurusan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      IdUniversitas: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Campuses",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      nilai: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Invitees');
  }
};