const informeVentasEmp = require('../model/informeVentasEmp');
const informeVentas = require('../model/informeVentas');
const informeProductoP = require('../model/informeProductoP');
const informeProductoMP = require('../model/informeProductoMP')
const informeMermas = require('../model/informeMermas')

exports.informeVentasEmp = async (req, res) => {
    try {
      const { id_user } = req.params
      const informeemp = await informeVentasEmp.findAll({
            where: {
                id_user: id_user
            }
        });
      res.json(informeemp);
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error en el servidor');
    }
}

exports.informeVentas = async (req, res) => {
  try {
    const { idusuario } = req.params
    const Ventas = await informeVentas.findAll({
          where: {
              idusuario: idusuario
          }
      });
    res.json(Ventas);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
}

exports.informeProductoP = async (req, res) => {
  try {
    const { idusuario } = req.params
    const producto_popular = await informeProductoP.findAll({
          where: {
              idusuario: idusuario
          }
      });
    res.json(producto_popular);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
}

exports.informeProductoMP = async (req, res) => {
  try {
    const { idusuario } = req.params
    const menos_popular = await informeProductoMP.findAll({
          where: {
              idusuario: idusuario
          },
          limit : 10
      });
    res.json(menos_popular);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
}

exports.informeMermas = async (req, res) => {
  try {
    const { idusuario } = req.params
    const mermas = await informeMermas.findAll({
          where: {
              idusuario: idusuario
          }
      });
    res.json(mermas);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
}