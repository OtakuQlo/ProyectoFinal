const express = require('express');
const connection = require('./config/db');
const app = express();
const cors = require("cors")
connection.connect();
app.use(cors())
app.use(express.json())

app.use('/api/marca',require('./routes/marca'));
app.use('/api/plans',require('./routes/plans'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/perfiles',require('./routes/perfiles'));
app.use('/api/productos',require('./routes/productos'));
app.use('/api/empresas',require('./routes/empresas'));
app.use('/api/productollegadas',require('./routes/productollegadas.js'));
app.use('/api/perdidas',require('./routes/perdidas'));
app.use('/api/stockproducts',require('./routes/stockproducts'));
app.use('/api/boletas',require('./routes/boletas'));
app.use('/api/detalleventas',require('./routes/detalleVentas.js'));
app.use('/api/reportes',require('./routes/reportes'));
app.use('/api/mail',require('./resend/routesMail.js'));
app.use('/api/informes',require('./routes/informes.js'));
app.use('/api/pago',require('./pago/transaccion_routes.js'));
app.use('/api/tarjeta',require('./routes/tarjetas.js'));

app.get('/api/marca', (req, res) => {
  res.send('HOLA');
});

app.listen(3000, () => {
  console.log('El servidor está corriendo');
});

connection.end()