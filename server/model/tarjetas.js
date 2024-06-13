const { Sequelize, DataTypes, Model } = require('sequelize');
const Usuarios = require('./usuarios');
const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});
class Tarjetas extends Model {}
Tarjetas.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cvv:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    month:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idusuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Tarjetas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
})
Usuarios.hasMany(Tarjetas,{
    foreignKey: 'idusuario'
});
Tarjetas.belongsTo(Usuarios,{
    foreignKey: 'idusuario'
});

module.exports= Tarjetas;