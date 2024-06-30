
const StockProducts = require("../model/stockproducts");



exports.obtenerStock = async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const stockproducts = await StockProducts.findAndCountAll({ where: { idusuario: id } });; // Buscamos la marca por su ID
  
      if (!stockproducts) { // Si no se encontró la marca
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
      
      res.json(stockproducts); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
  };

  exports.obtenerStockProducto = async (req, res) => {
    try {
      const { idproducto } = req.params; // Obtenemos el ID de los parámetros de la solicitud
      const stockproducts = await StockProducts.findOne({ where: { idproducto: idproducto } });; // Buscamos la marca por su ID
  
      if (!stockproducts) { // Si no se encontró la marca
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
      
      res.json(stockproducts); // Enviamos la marca encontrada como respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send('HUBO UN ERROR');
    }
  };
 