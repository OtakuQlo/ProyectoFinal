
const Boletas = require("../model/boletas")
const Detalle = require("../model/detalleventas")
const Producto = require("../model/productos")
exports.creandoBoletas= async (req,res)=>{
    try{
        let boleta;
        boleta = new Boletas(req.body);
        await boleta.save();
        res.send(boleta)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR CREANDO BOLETA')
    }
}
exports.obtenerBoleta= async(req,res)=>{
    try{
        const { idperfil } = req.params
        const boleta = await Boletas.findAll({
            where : {
                idperfil : idperfil,
                estado : 0
            }
        });
        res.json(boleta)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.obtenerBoletas= async(req,res)=>{
    try{
        const boleta = await Boletas.findAll({
            include:[{
                model:Detalle,
                require:false,
                include:[{
                    model:Producto,
                    require:false,
                }]
            }],
            where:{
                idperfil: req.params.id,
                estado : 1
            }
        });
        res.json(boleta)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.actualizarBoleta = async (req, res) => {
    try {
        const { preciototal } = req.body;
        let boleta = await Boletas.findOne({where: {idboleta : req.params.id}});

        if (!boleta) {
            return res.status(404).json({ msg: 'No existe la boleta' });
        }

        // Actualizar los campos de la marca
        
        boleta.preciototal = preciototal ;
        boleta.estado = true;
        

        // Guardar los cambios en la base de datos
        await boleta.save();
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar la boleta');
    }
};

exports.borrarBoleta = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const boleta = await Boletas.findByPk(req.params.id);

        // Verificar si la marca existe
        if (!boleta) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Eliminar la marca de la base de datos
        await boleta.destroy();

        res.json({ msg: 'La boleta ha sido eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar la boleta');
    }
};


exports.obtenerBoletaId = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const boleta = await Boletas.findByPk(id); // Buscamos la marca por su ID
  
      if (!boleta) { // Si no se encontró la marca
        return res.status(404).json({ error: 'Boleta no encontrada' });
      }
  
      res.json(boleta); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
};