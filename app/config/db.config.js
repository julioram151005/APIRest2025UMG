module.exports = {
  HOST: "ep-odd-bar-a4m6ozo2-pooler.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_OPI4AivGlo0c",
  DB: "neondb",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}; 