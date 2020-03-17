sequelize model:generate --name employees --attributes employee_first_name:string,employee_last_name:string,employee_email_address:string,department_id:integer

sequelize model:generate --name tasks --attributes task_title:string,employee_id:integer,task_instruction:string,task_status:string,employees_task_notes:string,task_approval:boolean