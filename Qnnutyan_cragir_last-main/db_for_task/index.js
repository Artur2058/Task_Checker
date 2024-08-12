const Sequelize=require("sequelize");
const sequelize=new Sequelize("Task", "root", "", {
    dialect:"mysql",
    host:"127.0.0.1",
    logging:false
});
const task=require("./task")(sequelize);
module.exports={
    task:task,
    sequelize:sequelize
}