const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb'); // Importa MongoClient desde la biblioteca 'mongodb'

const app = express();


// Conexión a la base de datos MongoDB
const mongoUrl = 'mongodb://localhost:27017'; // URL de conexión a MongoDB
const dbName = 'miBaseDeDatos'; 
let db; // Variable para almacenar la conexión a la base de datos

async function connectToDatabase() {
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

connectToDatabase(); // Llamada a la función para conectar a la base de datos



app.post('/login', (req, res) => {
  // lógica de inicio de sesión
});

app.post('/buttonClick', (req, res) => {
    //lógica de seguimiento de clics en botones
});



// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
