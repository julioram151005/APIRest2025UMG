module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    var router = require("express").Router();//crea un router para las rutas de cliente
    router.post("/create/", clientes.create);//crea un cliente
    router.get("/", clientes.findAll);//obtiene todos los clientes
    router.get("/status", clientes.findAllStatus); //obtiene todos los clientes con status
    router.get("/:id", clientes.findOne);//obtiene un cliente por id
    router.put("/update/:id", clientes.update);//actualiza un cliente por id
    router.delete("/delete/:id", clientes.delete);//elimina un cliente por id
    router.delete("/delete/", clientes.deleteAll);//elimina todos los clientes
    app.use("/api/customer", router);//configura la ruta base para las rutas de cliente
}; 