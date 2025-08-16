const dbConfig = require('../config/db.config.js');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
},
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.clientes = require("./cliente.mod.js")(sequelize, Sequelize);
db.vehiculo = require("./vehiculo.mod.js")(sequelize, Sequelize);
db.alquiler = require("./alquiler.mod.js")(sequelize, Sequelize);

db.clientes.hasMany(db.alquiler, { foreignKey: 'id_cliente' });
db.alquiler.belongsTo(db.clientes, { foreignKey: 'id_cliente' });

db.vehiculo.hasMany(db.alquiler, { foreignKey: 'id_vehiculo' });
db.alquiler.belongsTo(db.vehiculo, { foreignKey: 'id_vehiculo' });


module.exports = db;
