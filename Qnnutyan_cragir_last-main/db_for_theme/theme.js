const {Sequelize, DataTypes}=require("sequelize");
module.exports=function(sequelize){
     return sequelize.define("theme", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true 
          }
},
{
timestamps:false,
tableName:"theme"
});
}