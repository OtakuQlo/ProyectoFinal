const Perfiles = require("../model/perfiles")
const Op = require('sequelize')
exports.creandoPerfiles= async (req,res)=>{
    try{
        let perfiles;
        perfiles = new Perfiles(req.body);
        await perfiles.save();
        res.send(perfiles)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR CREANDO PERFILES')
    }
}
exports.obtenerPerfil= async(req,res)=>{
    try{
        const { idusuario } = req.params;
        const perfiles = await Perfiles.findAll({
            where : {
                idusuario : idusuario,
            }
        });
        res.json(perfiles)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.actualizarPerfil = async (req, res) => {
    try {
      const { nombre } = req.body // Obtenemos el ID de los parámetros de la solicitud
      const perfil = await Perfiles.findByPk(req.params.id); // Buscamos la marca por su ID
  
      if (!perfil) { // Si no se encontró la marca
        return res.status(404).json({ error: 'Marca no encontrada' });
      }

      perfil.nombre = nombre
      

      await perfil.save();
      
      res.json(perfil); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
};

exports.borrarPerfil = async (req, res) => {
  try {
      // Buscar la marca por su ID
      const { id } = req.params
      const perfiles = await Perfiles.findByPk(id);
      

      // Verificar si la marca existe
      if (!perfiles) {
          return res.status(404).json({ msg: 'el perfil no existe' });
      }
      console.log(perfiles)
      // Eliminar la marca de la base de datos
      await perfiles.destroy();

      res.json({ msg: 'el perfil ha sido eliminada' });
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error ');
  }
};

exports.crearPerfilAdmin= async (req,res)=>{
    try{
        let perfil;
        perfil = new Perfiles(req.body);
        await perfil.save();
        res.send(perfil)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR');
    }
}

