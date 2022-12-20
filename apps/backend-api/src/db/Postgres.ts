import { Dialect, Sequelize } from 'sequelize'

const dbName: string = process.env.PGDATABASE
const dbUser: string = process.env.PGUSER
const dbHost = process.env.PGHOST
const dbDriver: Dialect = 'postgres'
const dbPassword = process.env.PGPASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false
})

export default sequelizeConnection