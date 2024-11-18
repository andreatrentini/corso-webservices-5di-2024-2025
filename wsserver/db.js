const mysql = require('mysql2/promise');

// Creao un pool di connessione che il mio web service userà per connettersi a MYSQL

const pool = mysql.createPool({
    host: 'dbserver',
    user: 'root',
    password: 'cisco',
    port: 3306,
    database: 'dbapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

