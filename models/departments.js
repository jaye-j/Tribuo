"use strict";
module.exports = (sequelize, DataTypes) => {
  const departments = sequelize.define(
    "departments",
    {
      department_title: DataTypes.STRING,
      department_managers: DataTypes.STRING
    },
    {}
  );
  departments.associate = function(models) {
    departments.hasMany(models.employees, { foreignKey: "department_id" });
    departments.hasMany(models.tasks, { foreignKey: "department_id" });
  };
  return departments;
};
