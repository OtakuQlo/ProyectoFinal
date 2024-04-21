
const Usuarios = require("../model/usuarios");

exports.creandoUsuarios= async (req,res)=>{
    try{
        let usuarios;
        usuarios = new Usuarios(req.body);
        await usuarios.save();
        res.send(usuarios)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}
exports.obtenerUsuarios= async(req,res)=>{
    try{
        const usuarios = await Usuarios.findAll();
        res.json(usuarios)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN BUSCAR USUARIOS')
    }
}
exports.obtenerUsuariosId = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const usuarios = await Usuarios.findByPk(id); // Buscamos la marca por su ID
  
      if (!usuarios) { // Si no se encontró la marca
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
  
      res.json(usuarios); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
  };

  exports.actualizarContra = async (req, res) => {
    try {
        const { contra } = req.body;
        let usuarios = await Usuarios.findByPk(req.params.id);

        if (!usuarios) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Actualizar los campos de la marca
       usuarios.contra = contra;
        

        // Guardar los cambios en la base de datos
        await usuarios.save();

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar la pass');
    }
};