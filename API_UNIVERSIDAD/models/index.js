const dbConfig = require("../config/db.config.js");
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

// Modelos
db.students = require("./student.model.js")(sequelize, Sequelize);
db.teachers = require("./teacher.model.js")(sequelize, Sequelize);
db.cursos = require("./curso.model.js")(sequelize, Sequelize);
db.asignacion = require("./asignacion.model.js")(sequelize, Sequelize);
db.grados = require("./grado.model.js")(sequelize, Sequelize);
db.admins = require("./admin.model.js")(sequelize, Sequelize);

// Relaciones Teacher
db.cursos.belongsTo(db.teachers, { foreignKey: "id_teacher" });
db.teachers.hasMany(db.cursos, { foreignKey: "id_teacher" });

// Relaciones Asignacion
db.asignacion.belongsTo(db.students, { foreignKey: "id_student" });
db.asignacion.belongsTo(db.cursos, { foreignKey: "id_curso" }); 

db.students.hasMany(db.asignacion, { foreignKey: "id_student" });
db.cursos.hasMany(db.asignacion, { foreignKey: "id_curso" });

// Relaciones Grados
db.grados.belongsTo(db.students, { foreignKey: "id_student" });
db.grados.belongsTo(db.cursos, { foreignKey: "id_curso" });

db.students.hasMany(db.grados, { foreignKey: "id_student" });
db.cursos.hasMany(db.grados, { foreignKey: "id_curso" });

module.exports = db;
