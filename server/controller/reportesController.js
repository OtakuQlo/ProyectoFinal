
const Reportes = require("../model/reportes");

exports.creandoReporte= async (req,res)=>{
    try{
        let reporte;
        reporte = new Reportes(req.body);
        await reporte.save();
        res.send(reporte)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR CREANDO REPORTES')
    }
}
exports.obtenerReportes= async(req,res)=>{
    try{
        const reporte = await Reportes.findAll();
        res.json(reporte)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN BUSCAR REPORTES')
    }
}
exports.obtenerReporteId = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const reporte = await Reportes.findByPk(id); // Buscamos la marca por su ID
  
      if (!reporte) { // Si no se encontró la marca
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
  
      res.json(reporte); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
  };

  exports.responderReporte = async (req, res) => {
    try {
        const { respuesta } = req.body;
        let reportes = await Reportes.findByPk(req.params.id);

        if (!reportes) {
            return res.status(404).json({ msg: 'El reporte no existe' });
        }
       reportes.respuesta = respuesta
       reportes.solucion = true
       
        await reportes.save();

        res.json(reportes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al responder el reporte');
    }
};


exports.borrarReporte = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const reporte = await Reportes.findByPk(req.params.id);
  
        // Verificar si la marca existe
        if (!reporte) {
            return res.status(404).json({ msg: 'el reporte no existe' });
        }
  
        // Eliminar la marca de la base de datos
        await reporte.destroy();
  
        res.json({ msg: 'el reporte ha sido eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error ');
    }
  };