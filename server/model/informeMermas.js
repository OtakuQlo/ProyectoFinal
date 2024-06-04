const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class informeMermas extends Model {}

informeMermas.init({
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey : true
    },
    nombreproducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull : false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull : true
    },
    total_perdido: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull : true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull : true
    }
}, {
    sequelize,
    modelName: 'informeMermas',
    timestamps: false,
    tableName: 'mermas' // Especifica el nombre de la vista
});

module.exports = informeMermas;
