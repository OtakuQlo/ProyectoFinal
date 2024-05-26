const { Sequelize, DataTypes, Model } = require('sequelize');
const Productos = require('./productos');
const Usuarios = require('./usuarios');
const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Perdidas extends Model {}

Perdidas.init({
    idperdidas:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idproducto:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    idusuario:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Perdidas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Usuarios.hasMany(Perdidas,{
    foreignKey: 'idusuario'
});
Perdidas.belongsTo(Usuarios,{
    foreignKey: 'idusuario'
});

Productos.hasMany(Perdidas,{
    foreignKey: 'idproducto'
});
Perdidas.belongsTo(Productos,{
    foreignKey: 'idproducto'
});



// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Perdidas;