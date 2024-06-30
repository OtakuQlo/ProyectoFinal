const { Resend } = require("resend");
const resend = new Resend("re_Cu461xLR_BZEGhh4Rwg7YEgWPrtiCHGbn");

exports.recuperarCuenta = async (req, res) => {
  
  const { id } = req.body;
  const { data, error } = await resend.emails.send({
    from: 'Ordenalotodo <onboarding@resend.dev>',
    to: ['proyectofinal118@gmail.com'],
    subject: 'Recuperar tu cuenta',
    html: `
    <html>
      <head>
        <title>Recuperar cuenta</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #333333;
            margin-top: 0;
          }
    
          p {
            color: #666666;
            margin-bottom: 20px;
          }
    
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3366cc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>¡Recuperar cuenta!</h1>
          <p>Para recuperar cuenta ingresa en el enlace:</p>
          <a class="button" href="http://localhost:4200/Home?id=`+id+`">Restablecer contraseña</a>
        </div>
      </body>
    </html>
    `,
});

if (error) {
  console.error(error);
  return res.status(500).json({ error: 'Error sending email' });
}
console.log(data)
};

exports.respuestaError = async (req, res) => {
  
  const { respuesta } = req.body;
  const { data, error } = await resend.emails.send({
    from: 'Ordenalotodo <onboarding@resend.dev>',
    to: ['proyectofinal118@gmail.com'],
    subject: 'Estado de error ',
    html: `
    <html>
      <head>
        <title>Solicitud Resuelta</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #333333;
            margin-top: 0;
          }
    
          p {
            color: #666666;
            margin-bottom: 20px;
          }
    
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3366cc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Respuesta</h1>
          <p>La resolución de problema `+respuesta+`</p>
        </div>
      </body>
    </html>
    `,
});

if (error) {
  console.error(error);
  return res.status(500).json({ error: 'Error sending email' });
}
console.log(data)
};



exports.correoStock = async (req, res) => {
  
  const { producto } = req.body;
  
  const { data, error } = await resend.emails.send({
    from: 'Ordenalotodo <onboarding@resend.dev>',
    to: ['proyectofinal118@gmail.com'],
    subject: 'Producto en stock bajo ',
    html: `
    <html>
      <head>
        <title>Producto critico</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #333333;
            margin-top: 0;
          }
    
          p {
            color: #666666;
            margin-bottom: 20px;
          }
    
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3366cc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Estado critico</h1>
          <p>El producto `+producto+` esta con un stock critico por debajo de un 30%.</p>
        </div>
      </body>
    </html>
    `,
});

if (error) {
  console.error(error);
  return res.status(500).json({ error: 'Error sending email' });
}
console.log(data)
};
