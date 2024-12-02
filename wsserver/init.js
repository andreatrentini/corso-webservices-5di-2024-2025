const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Import gli oggetti/funzioni dichiarate in altri file
// Per i nostri oggetti, funzioni, costanti, ecc. è necessario
// speficicare il percorso per raggiungere il file
const config = require('./config');

const router = express.Router();

// Implemento il metodo per l'inizializzazione del database
router.post('', async (request, response) => {
    // Funzione di callback mandata in esecuzione quando un client invia una richiesta per la URL
    // http://localhost:4444/init con metodo POST
    let secret = request.body.secret;
    let adminPassword = request.body.adminpassword

    let connessione;

    if (secret === config.initSecret) {
        try {
            // Carico lo script sql dal file system
            const scriptSQL = fs.readFileSync('./scripts/init.sql', 'utf8');
            // Creo una connessione con il server
            connessione = await mysql.createConnection(config.initDB);
            // Eseguo in modo sincrono lo script caricato dal file init.sql
            // await fa sì che prima di passare all'istruzione successiva la funzione
            // aspetti il completamento dell'operazione
            let result = await connessione.query(scriptSQL);
            // Registro l'inizializzazione del database nella tabella logs
            let logSQL = "INSERT INTO logs (event, eventtime) VALUES ('Inizializzazione database', now());";
            result = await connessione.query(logSQL);
            // Genero la versione criptata della password di admin
            let passwordCriptata = bcrypt.hashSync(adminPassword, config.saltOrRounds);
            // Aggiungo alla tabella users l'utente admibn
            const insertSQL = "INSERT INTO users (username, password, ruolo) VALUES ('admin', ?, 'administrator');";
            result = await connessione.query(insertSQL, passwordCriptata);
            // Registro nella tabella logs l'aggiunta dell'utente admin.
            logSQL = "INSERT INTO logs (event, eventtime) VALUES ('Aggiunto utente admin', now());";
            result = await connessione.query(logSQL);
            // Chiudo la connessione con il db server
            await connessione.end();
            // OK!!! Le operazioni sono andate a buon fine
            return response.status(200).send('Database inizializzato.');
        }
        catch (errore) {
            // Chiudo la connessione con il db server
            await connessione.end();
            // Invio un messaggio di errore al client
            return response.status(500).send(errore);
        }        
    }
    else {
        // Mandiamo al clint un messaggio di accesso non autorizzato.
        // Quando nella catena di esecuzione di express si trova .send,
        // ogni altra istruzione viene interrotta e la risposta immediatamente
        // inviata al client
        response.status(403).send('Secret non presente o errata.');
        // ... queste istruzioni non verranno mai eseguite
    }
})

module.exports = router;