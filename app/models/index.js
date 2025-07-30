const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { /*Es el contructor */
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


db.clientes =  require("./cliente.model.js")(sequelize,Sequelize);

module.exports = db;
