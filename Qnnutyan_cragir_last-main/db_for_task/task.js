// const {Sequelize, DataTypes}=require("sequelize");
// module.exports=function(sequelize){
//      return sequelize.define("task", {
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         title: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         description: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         solution: {
//             type: Sequelize.STRING,
//             allowNull: trur
//         },
//         themeId:{
//             type: Sequelize.STRING,
//             allowNull:false
//         }
// },
// {
// timestamps:false,
// tableName:"task"
// });
// }

const { Sequelize, DataTypes } = require("sequelize");

module.exports = function(sequelize) {
    return sequelize.define("task", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        solution: {
            type: Sequelize.STRING,
            allowNull: true
        },
        themeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM('code', 'multiple_choice'),
            allowNull: false
        },
        choices: {
            type: Sequelize.JSON,
            allowNull: true 
        },
        correctChoice: {
            type: Sequelize.STRING,
            allowNull: true 
        }
    }, {
        timestamps: false,
        tableName: "task"
    });
};
