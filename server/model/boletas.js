const { Sequelize, DataTypes, Model } = require('sequelize');
const Perfiles = require('./perfiles');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Boletas extends Model {}

Boletas.init({
    idboleta:{
        type: DataTypes.INTEGER,
        primaryKey:true,
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull:false
    },
    preciototal:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    idperfil:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Boletas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Perfiles.hasMany(Boletas,{
    foreignKey: 'idperfil'
});
Boletas.belongsTo(Perfiles,{
    foreignKey: 'idperfil'
});




// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Boletas;