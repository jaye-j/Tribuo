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
    // associations can be defined here
  };
  return departments;
};
