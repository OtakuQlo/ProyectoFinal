
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Plans extends Model {}

Plans.init({
    idplan:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreplan:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cantidademp:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    precio:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Plans',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});









// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Plans;