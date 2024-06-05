const Productos = require("../model/productos")
const Marca = require("../model/marca")
const Stock = require("../model/stockproducts");
const { Op, Sequelize } = require("sequelize");
exports.creandoProductos = async (req, res) => {
    try {
        let productos;
        productos = new Productos(req.body);
        await productos.save();
        res.send(productos)
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR AGREGANDO UN PRODUCTO')
    }
}
exports.obtenerProducto = async (req, res) => {
    try {
        const productos = await Productos.findAll();
        res.json(productos)
    }
    catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN ENCONTRAR PRODUCTOS')
    }
}

exports.obtenerProductosMarca = async (req, res) => {
    try {
        const { id } = req.params;
        const reporte = await Productos.findAll({
            include: [{
                model: Marca,
                require: false,
            },
            {
                model: Stock,
                where: {idusuario: id} ,
                require: false,
            }
            ]
        }
        )
        res.json(reporte)
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN LOS PRODUCTOS')
    }
}


exports.obtenerProductoBarcode = async (req, res) => {
    try {
        const idusuario = req.query.idusuario;
        const barcode = req.params.barcode;
        
        const productos = await Productos.findAll({
            where: {
                barcode: barcode,
            },
            include: [{
                model: Stock,
                attributes: ['cantidadtotal'],
                where: {
                    idusuario : idusuario
                },
                required: false // Esto asegura que los productos sin stock todavía se incluyan
            }]
        });
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN ENCONTRAR PRODUCTOS')
    }
}

exports.obtenerProductoId = async (req, res) => {
    try {
        const { id } = req.params;
        const productos = await Productos.findByPk(id);
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN ENCONTRAR EL PRODUCTO')
    }
}


exports.actualizarProducto = async (req, res) => {
    try {
        const { nombreproducto, idmarca, precio, barcode } = req.body;
        let producto = await Productos.findByPk(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Actualizar los campos de la marca
        producto.nombreproducto = nombreproducto;
        producto.idmarca = idmarca;
        producto.precio = precio;
        producto.barcode = barcode;

        // Guardar los cambios en la base de datos
        await producto.save();

        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar la marca');
    }
};

//en teoria esto no es necesario pero en caso de algo perdon

//miguel del 23-05 el weon de arriba se equivocó (yo, igual estaba carreteado mi compa, perdonenlo) 

exports.borrarProducto = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const productos = await Productos.findByPk(req.params.id);

        // Verificar si la marca existe
        if (!productos) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Eliminar la marca de la base de datos
        await productos.destroy();

        res.json({ msg: 'el producto ha sido eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar el producto');
    }
};