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
app.use('/api/productollegadas',require('./routes/productollegadas'));


app.get('/api/marca', (req, res) => {
  res.send('HOLA');
});

app.listen(3000, () => {
  console.log('El servidor está corriendo');
});

connection.end();