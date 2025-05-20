import express from "express";
import cors from "cors";
import db from "mysql2/promise";
import "dotenv/config";
// import bodyParser from "body-parser";
// import routes from "./routes";

const app = express();
const port = 3000;
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// const router = require("./routes");
// app.use("/api", router);

let connection;

try {
	connection = await db.createConnection({
		host: process.env.DB_HOST,
		// host: "localhost",
		database: process.env.DB_NAME,
		// database: "mydatabase",
		user: "root",
		password: "my-secret-pw",
		port: 3306,
	});
	console.log("Connection success");
} catch (error) {
	console.log("Connection error", error);
}

//Ruta de prueba
app.get("/", async (req, res) => {
	const [results] = await connection.query("SELECT * FROM usuario;");
	res.send(results);
});
app.get("/login", async (req, res) => {
	console.log("login hecho");
});

app.listen(port, () => {
	console.log("Backend escuchando en puerto 3000");
});
