const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./biblioteca/models");

db.sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err.message);
  });


require("./biblioteca/routes/estudiante.route")(app);
require("./biblioteca/routes/libro.route")(app);
require("./biblioteca/routes/prestamo.route")(app);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de la biblioteca." });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
