const Productos = require("../model/productos")
const Marca = require("../model/marca")
exports.creandoProductos= async (req,res)=>{
    try{
        let productos;
        productos = new Productos(req.body);
        await productos.save();
        res.send(productos)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR AGREGANDO UN PRODUCTO')
    }
}
exports.obtenerProducto= async(req,res)=>{
    try{
        const productos = await Productos.findAll();
        res.json(productos)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN ENCONTRAR PRODUCTOS')
    }
}

exports.obtenerProductosMarca= async(req,res)=>{
    try{
        const reporte = await Productos.findAll({
            include:Marca,
            required: false
        })
        res.json(reporte)
    }catch(error){
            console.log(error);
            res.status(500).send('HUBO UN ERROR EN ENCONTRAR MARCA')
        }
}


exports.obtenerProductoBarcode= async(req,res)=>{
    try{
        const { barcode } = req.params
        const productos = await Productos.findOne({
            where : {
                barcode : barcode,
            }
        });
        res.json(productos)

    }    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN ENCONTRAR PRODUCTOS')
    }
}
exports.obtenerProductoId= async(req,res)=>{
    try{
        const { id } = req.params; 
        const productos = await Productos.findByPk(id);
        res.json(productos)

    }    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN ENCONTRAR EL PRODUCTO')
    }
}
// exports.actualizarProducto = async (req, res) => {
//     try {
//         const { idmarca, nombremarca } = req.body;
//         let marca = await Marca.findByPk(req.params.id);

//         if (!marca) {
//             return res.status(404).json({ msg: 'La marca no existe' });
//         }

//         // Actualizar los campos de la marca
//         marca.idmarca = idmarca;
//         marca.nombremarca = nombremarca;

//         // Guardar los cambios en la base de datos
//         await marca.save();

//         res.json(marca);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Hubo un error al actualizar la marca');
//     }
// };

//en teoria esto no es necesario pero en caso de algo perdon

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