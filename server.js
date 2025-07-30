// Importamos el modulo express 
const express = require("express"); // Importamos express para crear el servidor
const bodyParser = require("body-parser"); // importamos body-parser para parsear el cuerpo de las peticiones
const cors = require("cors");// Importamos cors para permitir peticiones desde otros dominios

const app = express();// Creamos una instancia de express

var corsOptions = {
  origin: "http://localhost:8081"// Configuramos las opciones de cors para permitir peticiones desde el dominio http://localhost:8081
};

app.use(cors(corsOptions));


app.use(bodyParser.json());// Configuramos body-parser para parsear el cuerpo de las peticiones con content-type application/json
// app.use(express.json()); // Alternativa a bodyParser para parsear JSON, pero body

app.use(bodyParser.urlencoded({ extended: true }));// Configuramos body-parser para parsear el cuerpo de las peticiones con content-type application/x-www-form-urlencoded

const db = require("./app/models");
db.sequelize.sync();
//forza la sincronización de la base de datos, si se desea que se creen las tablas si no existen

// simple route
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

require("./app/routes/cliente.route.js")(app);
//require("./app/routes/turorial.routes.js")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});