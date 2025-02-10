const mysql = require('mysql2/promise');
const config = require('./config');

// Creao un pool di connessione che il mio web service userà per connettersi a MYSQL

const pool = mysql.createPool({
    host: 'dbserver',
    user: 'root',
    password: config.initDB.password,
    port: 3306,
    database: 'dbapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

