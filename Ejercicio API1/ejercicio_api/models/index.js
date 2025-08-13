const dbConfig = require('../config/db.config.js');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clientes = require("./cliente.mod.js")(sequelize, Sequelize);
db.productos = require("./productos.mod.js")(sequelize, Sequelize);
db.pedidos = require("./pedidos.mod.js")(sequelize, Sequelize);
db.detalle_pedidos = require("./detpedido.mod.js")(sequelize, Sequelize);

module.exports = db;
