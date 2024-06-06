
const Plans = require("../model/plans");


exports.obtenerPlan= async(req,res)=>{
    try{
        const plan = await Plans.findAll();
        res.json(plan)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN OBTENER PLANES')
    }
}



exports.obtenerPlanId = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const plan = await Plans.findByPk(id); // Buscamos la marca por su ID
  
      if (!plan) { // Si no se encontró la marca
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
  
      res.json(plan); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
  };

  exports.actualizarPlan = async (req, res) => {
    try {
        const { nombreplan, cantidademp, precio } = req.body;
        let plan = await Plans.findByPk(req.params.idplan);

        if (!plan) {
            return res.status(404).json({ msg: 'plan no existe' });
        }

        // Actualizar los campos de la marca
        plan.nombreplan = nombreplan;
        plan.cantidademp = cantidademp;
        plan.precio = precio;

        // Guardar los cambios en la base de datos
        await plan.save();

        res.json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar el planxd');
    }
};
