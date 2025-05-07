import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;
app.use(cors());

//Conexion a la base de datos
const connection = mysql.createConnection({
	host: "mysql",
	user: "root",
	password: "my-secret-pw",
	database: "mydatabase",
});

//Ruta de prueba
app.get("/", async (req, res) => {
	try {
		console.log("hola");
		const [results] = await connection.query("SELECT * FROM usuario;");
		res.send(`Conectado a MySQL. Resultado: ${results}`);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al conectar con la base de datos");
	}
});

app.listen(3000, () => {
	console.log("Backend escuchando en puerto 3000");
});
