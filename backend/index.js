import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'

const app = express();
const port = 3000
app.use(cors());
//Conexion a la base de datos
const connection = mysql.createConnection({
  host: 'mysql', // nombre del servicio en docker-compose
  user: 'root',
  password: 'my-secret-pw',
  database: 'mydatabase'
});
//const dbConfig = {
//  host: process.env.DB_HOST || 'localhost',
 // user: process.env.DB_USER || 'root',
 // password: process.env.DB_PASSWORD || '',
 // database: process.env.DB_NAME || 'mydatabase'
//};

//let pool;
//(async () => {
 // pool = await mysql.createPool(dbConfig);
//})();

//Ruta de prueba
app.get('/', async (req, res) => {
  try {
    // Usamos `query` para obtener datos
    const [rows] = await connection.query('SELECT NOW() AS date');
    res.send(`Conectado a MySQL. Fecha: ${rows[0].date}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al conectar con la base de datos');
  }
});
//app.get('/api/message', async (req, res) => {
 // try {
 //   const [rows] = await pool.query('SELECT NOW() AS now');
 //   res.json({ message: `Conectado a MySQL. Fecha: ${rows[0].now}` });
 // } catch (err) {
 //   console.error('Error de conexión a MySQL:', err.message);
   // res.status(500).json({ error: 'Error al conectar con la base de datos' });
  //}
//});


//app.get('/api/message', (req, res) => {
//  res.json({ message: 'Hola desde el backend!' });
//});

app.listen(3000, () => {
  console.log('Backend escuchando en puerto 3000');
});
