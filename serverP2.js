  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const app = express();

  const corsOptions = {
    //origin: "http://localhost:8081"  
    origin: "*"
  };

  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


    const db = require("./api_parcial/models/index.js");

  db.sequelize.sync()
    .then(() => {
      console.log("Base de datos sincronizada.");
    })
    .catch(err => {
      console.error("Error al sincronizar la base de datos:", err.message);
    });


  require("./api_parcial/routes/tarea.route.js")(app);

  app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de la UMG." });
  });

  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
  });
     