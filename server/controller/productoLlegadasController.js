
const ProductoLlegadas = require("../model/productollegadas");

exports.creandoProductosLlegada= async (req,res)=>{
    try{
        let producto;
        producto = new ProductoLlegadas(req.body);
        await producto.save();
        res.send(producto)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN AÑADIR UN PRODUCTO AL INVENTARIO')
    }
}
exports.obtenerInventario= async(req,res)=>{
    try{
        const producto = await ProductoLlegadas.findAll();
        res.json(producto)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN BUSCAR INVENTARIO')
    }
}


  exports.actualizarProducto = async (req, res) => {
    try {
        const {  nombre,fechaingreso ,fechavencimiento ,idproducto, idempresa} = req.body;
        let objeto = await ProductoLlegadas.findByPk(req.params.id);

        if (!objeto) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Actualizar los campos de la marca
       objeto.nombre = nombre;
       objeto.fechaingreso = fechaingreso;
       objeto.fechavencimiento = fechavencimiento;
       objeto.idproducto = idproducto;
       objeto.idempresa = idempresa
    
        

        // Guardar los cambios en la base de datos
        await objeto.save();

        res.json(objeto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar el registro de inventario');
    }

    
};

exports.borrarRegistro = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const producto = await ProductoLlegadas.findByPk(req.params.id);
  
        // Verificar si la marca existe
        if (!producto) {
            return res.status(404).json({ msg: 'el registro no existe' });
        }
  
        // Eliminar la marca de la base de datos
        await producto.destroy();
  
        res.json({ msg: 'el registro ha sido eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error ');
    }
  };