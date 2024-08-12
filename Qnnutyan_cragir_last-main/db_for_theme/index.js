const Sequelize=require("sequelize");
const sequelize=new Sequelize("Theme", "root", "", {
    dialect:"mysql",
    host:"127.0.0.1",
    logging:false
});
const theme=require("./theme")(sequelize);
module.exports={
    theme:theme,
    sequelize:sequelize
}