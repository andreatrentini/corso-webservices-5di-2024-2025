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
        // Il metodo execute restituisce un array composto da due valori, il primo sono i dati richiesti,
        // il secondo un array contenente tutta la descrizione dei campi della tabella.
        // Scrivendo [dati] fra parentesi quadre, stabiliamo che ci interessa solo il primo valore dell'array
        // che ci arriva come risposta (i dati) e non la descrizione dei campi della tabella.
        const [dati] = await pool.execute(SQLstring);
        return response.status(200).send(dati);
    }
    catch (error) {
        // Con il metodo json(...) inviamo al server un oggetto javascript composto da messaggio ed errore ricevuto 
        // da MYSQL formattato in JSON
        return response.status(500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: error
        });
    }
})

module.exports = router;