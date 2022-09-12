const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'valrapi',
    password: '12345',
    port: process.env.DB_PORT
})

module.exports = pool