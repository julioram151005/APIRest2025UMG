module.exports = app => {
    const detalles = require("../controllers/detpedido.control.js");
    const router = require("express").Router();
    router.post("/", detalles.create);
    router.get("/", detalles.getAll);
    router.get("/pedido/:id", detalles.getByPedidoId);
    router.get("/pendientes", detalles.getPendientes);
    router.put("/update/:id", detalles.update);
    router.delete("/:id", detalles.delete);
    app.use("/api/detpedidos", router);
};