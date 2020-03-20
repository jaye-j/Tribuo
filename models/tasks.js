"use strict";
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define(
    "tasks",
    {
      task_title: DataTypes.STRING,
      employee_id: DataTypes.INTEGER,
      task_instruction: DataTypes.STRING,
      task_status: DataTypes.STRING,
      employees_task_notes: DataTypes.STRING,
      task_approval: DataTypes.BOOLEAN,
      department_id: DataTypes.INTEGER
    },
    {}
  );
  tasks.associate = function(models) {
    tasks.belongsTo(models.employees, { foreignKey: "employee_id" });
    tasks.belongsTo(models.departments, { foreignKey: "department_id" });
  };
  return tasks;
};
