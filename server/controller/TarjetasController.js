
const { Op } = require("sequelize");
const Tarjetas = require("../model/tarjetas");

exports.creandoTarjeta= async (req,res)=>{
    try {
        let tarjetas;
        tarjetas = new Tarjetas(req.body);
        console.log(tarjetas);
        await tarjetas.save();
        res.send(tarjetas)
    } catch (error) {
        res.status(500).send('HUBO UN ERROR')
        console.log(error);
    }
}
exports.cambiarTarjeta= async (req,res)=>{
    try {
        const { id } = req.params;
        const { numero,cvv,month,year } = req.body;
        let tarjetas = await Tarjetas.findByPk(id);
        
        tarjetas.numero = numero
        tarjetas.cvv = cvv
        tarjetas.month = month
        tarjetas.year = year
        console.log(req.body);
        await tarjetas.save();
        res.send(tarjetas)
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}
exports.obtenerTarjeta= async (req,res)=>{
    try {
        const { id } = req.params;
        let tarjetas;
        console.log(id);
        tarjetas = await Tarjetas.findAll({
            where: {
                idusuario: id,
              }
        });
        console.log(tarjetas);
        res.send(tarjetas)
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}
exports.elminarTarjeta= async (req,res)=>{
    try {
        const { id } = req.params;
        let tarjetas = await Tarjetas.findByPk(id);  
        await tarjetas.destroy();
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}


