import express from "express";
import cors from "cors";
import db from "mysql2/promise";

const app = express();
const port = 3000;
app.use(cors());
let connection;
try {
	console.log("Connection");
	console.log("process.env.DB_NAME", process.env.DB_NAME);
	connection = await db.createConnection({
		host: "mysql",
		user: "root",
		password: "my-secret-pw",
		port: 3306,
		database: process.env.DB_NAME,
	});
	console.log("Connection success");
} catch (error) {
	console.log("Connection error", error);
}

//Ruta de prueba
app.get("/", async (req, res) => {
	try {
		console.log("hola");
		const [results] = await connection.query("SELECT * FROM usuario;");

		res.status(200).send(results);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al conectar con la base de datos");
	}
});

app.listen(port, () => {
	console.log("Backend escuchando en puerto 3000");
});
