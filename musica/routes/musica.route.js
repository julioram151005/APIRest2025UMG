module.exports = app => {
    const musica = require("../controllers/musica.controller.js");
    var router = require("express").Router();
    router.post("/create", musica.create);
    router.get("/", musica.findAll);
    router.get("/nombre/:nombre", musica.findOne);
    router.put("/update/:id", musica.update);
    router.delete("/delete/:id", musica.delete);
    router.delete("/delete/", musica.deleteAll);
    app.use("/api/musicas", router);
};