// const sql = require('mysql2');
import sql from "mysql2";
import dotenv  from "dotenv"
dotenv.config()
// require("dotenv").config();

export const db = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  } );

