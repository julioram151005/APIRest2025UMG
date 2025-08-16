module.exports = app => {
    const alquiler = require("../controllers/alquiler.controller.js");
    const router = require("express").Router();
    router.post("/create", alquiler.create);
    router.get("/", alquiler.findAll);
    router.get("/:id", alquiler.findOne);
    router.put("/update/:id", alquiler.update);
    router.delete("/:id", alquiler.delete);
    app.use("/api/alquileres", router);
};