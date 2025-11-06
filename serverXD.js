  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const app = express();

  const corsOptions = {
    origin: "http://localhost:8081"  
    //origin: "*"
  };

  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


    const db = require("./API_FINAL/models/index.js");

  db.sequelize.sync()
    .then(() => {
      console.log("Base de datos sincronizada.");
    })
    .catch(err => {
      console.error("Error al sincronizar la base de datos:", err.message);
    });

  require("./API_FINAL/routes/allventa.route.js")(app);
  require("./API_FINAL/routes/inventario.js")(app);
  require("./API_FINAL/routes/localizacion.route.js")(app);
  require("./API_FINAL/routes/partido.route.js")(app);
  require("./API_FINAL/routes/usuario.route.js")(app);
  require("./API_FINAL/routes/venta.route.js")(app);

  app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API del Grupo S+." });
  });

  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
  });
     