const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Empresas extends Model {}

Empresas.init({
    idempresa:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreempresa:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Empresas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Empresas;