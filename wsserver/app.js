// Creo una costante che prende come valore il package express
const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import gli oggetti/funzioni dichiarate in altri file
// Per i nostri oggetti, funzioni, costanti, ecc. è necessario
// speficicare il percorso per raggiungere il file
const config = require('./config');

// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Aggiungo la libreria CORS: Aggiunge nell'intestazione della response
// Una riga che consente ad applicazioni ospitate su altri domini di accedere al webservice
app.use(cors());

// Pubblico il sito web di help contenuto nella cartella chiamata public
app.use('', express.static('public'));

// Implemento il metodo per l'inizializzazione del database
app.post('/init', (request, response) => {
    // Funzione di callback mandata in esecuzione quando un client invia una richiesta per la URL
    // http://localhost:4444/init con metodo POST
    let secret = request.body.secret;

    console.log(secret);

    if (secret === config.initSecret) {
        // Inizializzo il database

        response.status(200).send('Database inizializzato.');
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