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

const db = require("./ejercicio_api/models");
db.sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err.message);
  });

require("./ejercicio_api/routes/cliente.route")(app);
require("./ejercicio_api/routes/pedidos.route")(app);
require("./ejercicio_api/routes/detpedido.route")(app);
require('./ejercicio_api/routes/productos.route')(app);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de pedidos." });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
