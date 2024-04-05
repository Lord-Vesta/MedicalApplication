const sql = require('mysql2')

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "Luffy@0212",
    database: "medical"
})

module.exports = db;