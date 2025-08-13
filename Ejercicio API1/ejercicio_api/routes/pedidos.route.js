module.exports = app => {
    const pedidos = require("../controllers/pedidos.control.js");
    const router = require("express").Router();
    router.post("/create", pedidos.create);
    router.get("/", pedidos.getAll);
    router.get("/:id", pedidos.getById);
    router.put("/update/:id", pedidos.update);
    router.delete("/delete/:id", pedidos.delete);
    app.use("/api/pedidos", router);
};