const { Sequelize, DataTypes, Model } = require('sequelize');
const Usuarios = require('./usuarios');
const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Reportes extends Model {}

Reportes.init({
    idreporte:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    idusuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    respuesta:{
        type:DataTypes.STRING,
        allowNull:true
    },
    solucion:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }

}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Reportes',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});



Usuarios.hasMany(Reportes,{
    foreignKey: 'idusuario'
});
Reportes.belongsTo(Usuarios,{
    foreignKey: 'idusuario'
});


// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Reportes;