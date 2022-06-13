'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('users', [
       {
          name: "Satya",
          profession: "Admin System",
          avatar : "",
          role : "admin",
          email : "satya@gmail.com",
          password : await bcrypt.hash("satya123", 10), 
          created_at : new Date(),
          updated_at : new Date(),

        },
        {
          name: "Yein",
          profession: "Front End Developer",
          avatar : "",
          role : "student",
          email : "yein@gmail.com",
          password : await bcrypt.hash("yein123", 10), 
          created_at : new Date(),
          updated_at : new Date(),

        } 
    ]); 

  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('users', null, {});

  }
};
