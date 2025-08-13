module.exports = {
  HOST: "ep-morning-poetry-a4jscw3c-pooler.us-east-1.aws.neon.tech",
  PORT: 5432, // Puerto por defecto de PostgreSQL
  USER: "neondb_owner",
  PASSWORD: "npg_NM0wjqAJ3ZIH",
  DB: "neondb",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // necesario para conexiones SSL en Neon
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};