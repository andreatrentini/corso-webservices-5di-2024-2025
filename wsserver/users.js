// Gestire tutte le operazioni CRUD sulla tabella users
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator')
const config = require('./config'); 
const pool = require('./db');
const { administratorAuth } = require('./auth');
const { correctRequestData, getValues, setInsertFields, setInsertPlaceholders, setUpdateFields } = require('./utils');

// Questo router gestirà tutte le richieste dai client che hanno come url
// l'indirizzo di base: http://localhost:4444/users
const router = express.Router();

// 
router.use(administratorAuth);

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

router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const dati = [id];
        const SQLstring = 'SELECT * FROM users WHERE id=?;';
        // Il metodo execute restituisce un array composto da due valori, il primo sono i dati richiesti,
        // il secondo un array contenente tutta la descrizione dei campi della tabella.
        // Scrivendo [dati] fra parentesi quadre, stabiliamo che ci interessa solo il primo valore dell'array
        // che ci arriva come risposta (i dati) e non la descrizione dei campi della tabella.
        const [result] = await pool.execute(SQLstring, dati);
        return response.status(200).send(result);
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

router.post('', [
    // Questi elementi dell'array definiscono quali sono i criteri che devono essere soddisfatti dalla 
    // richiesta http ricevuta dal client
    body('username').notEmpty().withMessage('Username deve essere not null'),
    body('password').notEmpty().withMessage('Password deve essere not null'),
    body('ruolo').notEmpty().withMessage('Ruolo deve essere not null')
], async (request, response) => {
    // validationResult(request) analizza la richiesta http del client per vedere se soddisfa i criteri stabiliti sopra
    const errori = validationResult(request);
    // Se errori non è vuoto significat che mancano alcuni dati
    if(!errori.isEmpty()) {
        // Rispondo immediatamente al client con un messgio di bad request e l'elenco degli errori presenti
        return response.status(400).json({
            errori: errori.array()
        })
    }

    try {        
        // Correggo i dati che mi arrivano dal client
        const bodyCorretto = correctRequestData(request.body, 'users');
        
        // Ottengo un array con i dati da inserire nel database
        const dati = getValues(bodyCorretto);
        
        // Genero l'istruzione SQL di inserimento        
        const SQLstring = 'INSERT INTO users ' + setInsertFields(bodyCorretto) + ' VALUES ' + setInsertPlaceholders(bodyCorretto) + ';'
        
        const result = await pool.execute(SQLstring, dati);
        return response.status(200).send(result);
    }
    catch (errore) {
        return response.status(500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: errore
        });
    }        
})

router.put('/:id', async (request, response) => {
    // Recupero il parametro id dalla URL
    const id = request.params.id;

    try {

        const bodyCorretto = correctRequestData(request.body, 'users');
        const dati = getValues(bodyCorretto);
        dati.push(id);
        const SQLstring = 'UPDATE users SET ' + setUpdateFields(bodyCorretto) + ' WHERE id = ?';
        const result = await pool.execute(SQLstring, dati);
        return response.status(200).send(result);
    }
    catch (errore) {
        return response.status(500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: errore
        });
    }
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const SQLstring = 'DELETE FROM users WHERE id=?';
    const dati = [id];
    try {
        const result = await pool.execute(SQLstring, dati);
        return response.status(200).send(result);
    }
    catch (errore) {
        return response.status(500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: errore
        });
    }
})

module.exports = router;