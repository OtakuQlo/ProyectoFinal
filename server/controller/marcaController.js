
const Marca = require("../model/marca")
exports.creandoMarca= async (req,res)=>{
    try{
        let marca;
        marca = new Marca(req.body);
        await marca.save();
        res.send(marca)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}
exports.obtenerMarca= async(req,res)=>{
    try{
        const marca = await Marca.findAll();
        res.json(marca)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.actualizarMarca = async (req, res) => {
    try {
        const { idmarca, nombremarca } = req.body;
        let marca = await Marca.findByPk(req.params.id);

        if (!marca) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Actualizar los campos de la marca
        marca.idmarca = idmarca;
        marca.nombremarca = nombremarca;

        // Guardar los cambios en la base de datos
        await marca.save();

        res.json(marca);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar la marca');
    }
};

exports.borrarMarca = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const marca = await Marca.findByPk(req.params.id);

        // Verificar si la marca existe
        if (!marca) {
            return res.status(404).json({ msg: 'La marca no existe' });
        }

        // Eliminar la marca de la base de datos
        await marca.destroy();

        res.json({ msg: 'La marca ha sido eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar la marca');
    }
};

