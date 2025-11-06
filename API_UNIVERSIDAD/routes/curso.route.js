module.exports = app => {
    const cursoController = require("../controllers/curso.controller.js");
    const router = require("express").Router();
    router.post("/create", cursoController.create);
    router.get("/", cursoController.findAll);
    router.get("/:id", cursoController.findOne);
    router.put("/update/:id", cursoController.update);
    router.delete("/delete/:id", cursoController.delete);
    app.use("/api/cursos", router);
}; 