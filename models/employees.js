"use strict";
module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define(
    "employees",
    {
      employee_first_name: DataTypes.STRING,
      employee_last_name: DataTypes.STRING,
      employee_email_address: DataTypes.STRING,
      department_id: DataTypes.INTEGER,
      employee_password: DataTypes.STRING,
      is_manager: DataTypes.BOOLEAN,
      is_admin: DataTypes.BOOLEAN
    },
    {}
  );
  employees.associate = function(models) {
    // associations can be defined here
    employees.hasMany(models.tasks, { foreignKey: "employee_id" });
    employees.belongsTo(models.departments, { foreignKey: "department_id" });
  };
  return employees;
};
