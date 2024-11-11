// Creo una costante che prende come valore il package express
const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Import gli oggetti/funzioni dichiarate in altri file
// Per i nostri oggetti, funzioni, costanti, ecc. è necessario
// speficicare il percorso per raggiungere il file
const config = require('./config');

// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Aggiungo la libreria CORS: Aggiunge nell'intestazione della response
// Una riga che consente ad applicazioni ospitate su altri domini di accedere al webservice
app.use(cors());

// Pubblico il sito web di help contenuto nella cartella chiamata public
app.use('', express.static('public'));

// Implemento il metodo per l'inizializzazione del database
app.post('/init', async (request, response) => {
    // Funzione di callback mandata in esecuzione quando un client invia una richiesta per la URL
    // http://localhost:4444/init con metodo POST
    let secret = request.body.secret;
    let adminPassword = request.body.adminpassword

    console.log(secret);
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
            const insertSQL = "INSERT INTO users (username, password) VALUES ('admin', ?);";
            result = await connessione.query(insertSQL, passwordCriptata);
            // Registro nella tabella logs l'aggiunta dell'utente admin.
            logSQL = "INSERT INTO logs (event, eventtime) VALUES ('Aggiunto utente admin', now());";
            result = await connessione.query(logSQL);
            
            // OK!!! Le operazioni sono andate a buon fine
            response.status(200).send('Database inizializzato.');
        }
        catch (errore) {
            response.status(500).send(errore);
        }
        finally {
            await connessione.end();
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

// ... implemento metodi CRUD

// Metto in ascolto la mia applicazione express sulla porta scelta per il webservice: 4444

const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta ' + config.port + '...');
})