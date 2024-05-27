
const { Op } = require("sequelize");
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
  exports.obtenerUsuariosEmail = async (req, res) => {
    try {
      const { email } = req.params; // Get the email from request parameters
      const usuario = await Usuarios.findOne({ where: { email: email } }); // Find the user by email
    
      if (!usuario) { // If user not found
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    
      res.json(usuario); // Send the found user as response
    } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error');
    }
  };
  exports.actualizarContra = async (req, res) => {
    try {
        const { contra, estado } = req.body;
        let usuarios = await Usuarios.findByPk(req.params.id);

        if (!usuarios) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Actualizar los campos de la marca
        if (contra!="") {
          usuarios.contra = contra;
          usuarios.estado=estado; 
        }else{
          usuarios.estado=estado; 
        }
      
      

        // Guardar los cambios en la base de datos
        await usuarios.save();

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar la pass');
    }
};

exports.usuarioExistenete = async(req,res)=>{
  try {
    const { email ,rut} = req.query; // Get the email from request parameters
    const usuario = await Usuarios.findAll({ 
      where: {
        [Op.or]: [{email:email }, { rut: rut }],
      },
     }); // Find the user by email
  
    if (!usuario) { // If user not found
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    res.json(usuario); // Send the found user as response
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
}

exports.actualizarPlan = async (req, res) => {
  try {
      const { idplan } = req.body;
      let usuario = await Usuarios.findByPk(req.params.id);

      if (!usuario) {
          return res.status(404).json({ msg: 'El usuario no existe' });
      }

      // Actualizar los campos de la marca
      usuario.idplan = idplan;
      

      // Guardar los cambios en la base de datos
      await usuario.save();

      res.json(usuario);
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error al actualizar el id plan');
  }
};


