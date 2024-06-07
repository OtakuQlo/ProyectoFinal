const { Sequelize, DataTypes, Model } = require('sequelize');
const Plans = require("../model/plans")
const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Usuarios extends Model {}

Usuarios.init({
    idusuario:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rut:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contra:{
        type:DataTypes.STRING,
        allowNull:false
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idplan:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rol:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    estado:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    habilitado:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Usuarios',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Plans.hasMany(Usuarios,{
    foreignKey: 'idplan'
});
Usuarios.belongsTo(Plans,{
    foreignKey: 'idplan'
});



// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Usuarios;