
const { Op, and } = require("sequelize");
const Perdidas = require("../model/perdidas");
const Stock = require("../model/stockproducts")
exports.creandoPerdida = async (req, res) => {
    try {
        const { idproducto, idusuario,cantidad } = req.body
        let Count = await Stock.findAndCountAll({
            where: { [Op.and]: [{ idproducto: idproducto }, { idusuario: idusuario }] }
        })
        if (Count.count > 0 && (Count.rows[0].dataValues.cantidadtotal-cantidad)>=0 ) {
            let reporte;
            reporte = new Perdidas(req.body);
            await reporte.save();
            res.send(reporte)
        } else {
            console.log(error);
            res.status(500).send('HUBO UN ERROR CREANDO REPORTES')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR CREANDO REPORTES')
    }
}
exports.obtenerPerdida = async (req, res) => {
    try {
        const reporte = await Perdidas.findAll();
        res.json(reporte)
    }
    catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN BUSCAR REPORTES')
    }
}
exports.obtenerPerdidaId = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
        const reporte = await Perdidas.findByPk(id); // Buscamos la marca por su ID

        if (!reporte) { // Si no se encontró la marca
            return res.status(404).json({ error: 'usuario no encontrado' });
        }

        res.json(reporte); // Enviamos la marca encontrada como respuesta
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR');
    }
};

exports.actualizarPerdida = async (req, res) => {
    try {
        const { descripcion, fecha, cantidad } = req.body;
        let reporte = await Perdidas.findByPk(req.params.id);

        if (!reporte) {
            return res.status(404).json({ msg: 'El reporte no existe' });
        }

        // Actualizar los campos de la marca
        reporte.descripcion = descripcion;
        reporte.fecha = fecha;
        reporte.cantidad = cantidad;



        // Guardar los cambios en la base de datos
        await reporte.save();

        res.json(reporte);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar el reporte');
    }
};


exports.borrarPerdida = async (req, res) => {
    try {
        // Buscar la marca por su ID
        const reporte = await Perdidas.findByPk(req.params.id);

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