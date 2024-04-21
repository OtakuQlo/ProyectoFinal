
const DetalleVentas = require("../model/boletas")
exports.creandoDetalle= async (req,res)=>{
    try{
        let detalle;
        detalle = new DetalleVentas(req.body);
        await detalle.save();
        res.send(detalle)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR CREANDO DETALLE')
    }
}
exports.obtenerDetalle= async(req,res)=>{
    try{
        const detalle = await DetalleVentas.findAll();
        res.json(detalle)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.actualizarDetalle = async (req, res) => {
    try {
        const { idboleta, idproducto, cantidad} = req.body;
        let detalle = await DetalleVentas.findByPk(req.params.id);

        if (!detalle) {
            return res.status(404).json({ msg: 'No existe el detalle' });
        }

        // Actualizar los campos de la marca
        detalle.idboleta = idboleta;
        detalle.idproducto = idproducto;
        detalle.cantidad = cantidad;
        // Guardar los cambios en la base de datos
        await detalle.save();

        res.json(detalle);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar el detalle');
    }
};

exports.borrarDetalle = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const detalle = await DetalleVentas.findByPk(req.params.id);

        // Verificar si la marca existe
        if (!detalle) {
            return res.status(404).json({ msg: 'El detalle no existe' });
        }

        // Eliminar la marca de la base de datos
        await detalle.destroy();

        res.json({ msg: 'el detalle ha sido eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar el detalle');
    }
};


exports.obtenerDetalleId = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const detalle = await DetalleVentas.findByPk(id); // Buscamos la marca por su ID
  
      if (!detalle) { // Si no se encontró la marca
        return res.status(404).json({ error: 'Detalle no encontrada' });
      }
  
      res.json(detalle); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
};