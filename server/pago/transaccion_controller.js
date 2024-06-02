const TransaccionCompleta = require("transbank-sdk").TransaccionCompleta;

exports.create = async (req,res)=>{
    try {
        console.log("Request body:", typeof req.body.cardnumber);
        let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
        let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
        let precio = req.body.precio    ;
        let cvv = req.body.cvv;
        let cardnumber = req.body.cardnumber;
        let month= req.body.month;
        let year = req.body.year;
        console.log(year + "/" + month);
        const createPago = await (new TransaccionCompleta.Transaction()).create(
            buyOrder,
            sessionId,
            precio,
            cvv,
            cardnumber,
            year + "/" + month
        );
        res.status(200).send(createPago);
        console.log(createPago);
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN EL PAGO')
    }
}


exports.commit =  async (req,res)=>{
    try {
        let token = req.body.token
        const response = await (new TransaccionCompleta.Transaction().commit(token))
        res.status(200).send(response);
        console.log(response);
        // res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR EN EL PAGO')
    }
}