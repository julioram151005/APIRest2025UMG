module.exports = app => {
    const libro = require("../controllers/libro.controller.js");
    var router = require("express").Router();
    router.post("/create", libro.create);
    router.get("/", libro.findAll);
    router.get("/:id", libro.findOne);
    router.put("/update/:id", libro.update);
    router.delete("/delete/:id", libro.delete);
    router.delete("/delete/", libro.deleteAll);
    app.use("/api/libro", router);
};