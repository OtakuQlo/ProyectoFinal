const express = require('express');
const connection = require('./config/db');
const app = express();
const cors = require("cors")
connection.connect();
app.use(cors())
app.use(express.json())

app.use('/api/marca',require('./routes/marca'));


app.get('/api/marca', (req, res) => {
  res.send('HOLA');
});

app.listen(3000, () => {
  console.log('El servidor está corriendo');
});

connection.end();