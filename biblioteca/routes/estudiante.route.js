module.exports = app => {
    const estudiante = require("../controllers/estudiante.controller.js");
    var router = require("express").Router();
    router.post("/create", estudiante.create);
    router.get("/", estudiante.findAll);
    router.get("/:id", estudiante.findOne);
    router.put("/update/:id", estudiante.update);
    router.delete("/delete/:id", estudiante.delete);
    router.delete("/delete/", estudiante.deleteAll);
    app.use("/api/estudiantes", router);
}; 