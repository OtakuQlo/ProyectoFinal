const connection = require('../config/db');

exports.informeVentasPerfiles = async (req, res) => {
    const query = 'SELECT * FROM ventas_emp';
    connection.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error en el servidor');
    }
    res.json(results);
  });

}
