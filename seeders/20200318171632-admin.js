"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "employees",
      [
        {
          employee_first_name: "Admin",
          employee_last_name: "Admin",
          employee_email_address: "admin@admin.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          employee_password: "admin",
          is_manager: true,
          is_admin: true
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
