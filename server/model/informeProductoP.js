const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class informeProductoP extends Model {}

informeProductoP.init({
    idproducto: {
        type: DataTypes.INTEGER,
        primaryKey : true
    },
    nombreproducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    c_total: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    v_total: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'informeProductoP',
    timestamps: false,
    tableName: 'producto_popular' // Especifica el nombre de la vista
});

module.exports = informeProductoP;
