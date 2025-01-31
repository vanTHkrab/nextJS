const mysql2 = require('mysql2/promise');
require('dotenv').config();

try {
    const pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    });
    console.log('Connected to the database');
    module.exports = pool;
} catch (err) {
    console.error(err);
    process.exit(1);
}




