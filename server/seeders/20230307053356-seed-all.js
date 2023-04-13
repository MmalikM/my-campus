'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let campuses = require('../data/kampus.json');
    campuses.forEach(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    let sbmptn = require('../data/sbmptn.json');
    sbmptn.forEach(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    let snmptn = require('../data/snmptn.json');
    snmptn.forEach(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert("Campuses",campuses)
    await queryInterface.bulkInsert("Exams",sbmptn)
    await queryInterface.bulkInsert("Invitees",snmptn)
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Invitee", null, {});
    await queryInterface.bulkDelete("Exams", null, {});
    await queryInterface.bulkDelete("Campuses", null, {});
  }
};
