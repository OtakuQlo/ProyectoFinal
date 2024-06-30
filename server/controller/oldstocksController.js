
const OldStocks = require("../model/oldstocks")

exports.obtenerOldStockId = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
        const oldstock = await OldStocks.findByPk(id); // Buscamos la marca por su ID

        if (!oldstock) { // Si no se encontró la marca
            return res.status(404).json({ error: 'producto no encontrado' });
        }

        res.json(oldstock); // Enviamos la marca encontrada como respuesta
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR ENCONTRADO UN PRODUCTO');
    }
};


exports.actualizarEstado = async (req, res) => {
    try {
        let oldstock = await OldStocks.findByPk(req.params.id);

        if (!oldstock) {
            return res.status(404).json({ msg: 'El oldstock no existe' });
        }

        // Actualizar los campos de la marca
        oldstock.estado = 1;
        
        // Guardar los cambios en la base de datos
        await oldstock.save();

        res.json(oldstock);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar el estado');
    }
};

