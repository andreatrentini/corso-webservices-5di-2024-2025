// Gestire tutte le operazioni CRUD sulla tabella users
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const config = require('./config'); 
const pool = require('./db');

// Questo router gestirà tutte le richieste dai client che hanno come url
// l'indirizzo di base: http://localhost:4444/users
const router = express.Router();

router.get('', async (request, response) => {
    try {
        const SQLstring = 'SELECT * FROM users;';
        const [dati] = await pool.execute(SQLstring);
        response.status(200).send(dati);
    }
    catch (error) {
        response.status(500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: error
        })
    }
})

module.exports = router;