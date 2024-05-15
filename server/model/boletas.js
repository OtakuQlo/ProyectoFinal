const { Sequelize, DataTypes, Model } = require('sequelize');
const Usuarios = require('./usuarios');

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
    nombretrabajador:{
        type:DataTypes.STRING,
        allowNull:false
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
    idusuario:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Boletas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Usuarios.hasMany(Boletas,{
    foreignKey: 'idusuario'
});
Boletas.belongsTo(Usuarios,{
    foreignKey: 'idusuario'
});

// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Boletas;