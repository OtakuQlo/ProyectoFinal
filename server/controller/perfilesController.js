const Perfiles = require("../model/perfiles")
exports.creandoPerfiles= async (req,res)=>{
    try{
        let perfiles;
        perfiles = new Perfiles(req.body);
        await perfiles.save();
        res.send(perfiles)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR CREADNO PERFILES')
    }
}
exports.obtenerPerfil= async(req,res)=>{
    try{
        const perfiles = await Perfiles.findAll();
        res.json(perfiles)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.obtenerPerfilId = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const perfiles = await Perfiles.findByPk(id); // Buscamos la marca por su ID
  
      if (!perfiles) { // Si no se encontró la marca
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
  
      res.json(perfiles); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
};

exports.borrarPerfil = async (req, res) => {
  try {
      // Buscar la marca por su ID
      const perfiles = await Perfiles.findByPk(req.params.id);

      // Verificar si la marca existe
      if (!perfiles) {
          return res.status(404).json({ msg: 'el perfil no existe' });
      }

      // Eliminar la marca de la base de datos
      await perfiles.destroy();

      res.json({ msg: 'el perfil ha sido eliminada' });
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error ');
  }
};

