
const Empresas = require("../model/empresas")
exports.creandoEmpresa= async (req,res)=>{
    try{
        let empresas;
        empresas = new Empresas(req.body);
        await empresas.save();
        res.send(empresas)
    }catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}
exports.obtenerEmpresa= async(req,res)=>{
    try{
        const empresa = await Empresas.findAll();
        res.json(empresa)
    }
    catch(error){
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}
