const { Sequelize, DataTypes, Model } = require('sequelize');
const Usuarios = require('./usuarios');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Perfiles extends Model {}

Perfiles.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idusuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },   
    passadmin:{
        type:DataTypes.STRING,
        allowNull:true
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Perfiles',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Usuarios.hasMany(Perfiles,{
    foreignKey: 'idusuario'
});
Perfiles.belongsTo(Usuarios,{
    foreignKey: 'idusuario'
});

// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Perfiles;