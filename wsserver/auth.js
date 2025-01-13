const jwt = require('jsonwebtoken');
const config = require('./config'); 
const pool = require('./db');

function administratorAuth(request, response, next) {
    // Leggere il campo presente nella richiesta http con nome authorization
    const authHeader = request.headers['authorization'];
    // Il valore deve essere scritto in questo modo: Bearer jSHDJSHFKSJKSHFJSK....
    // L'istruzione successiva controlla che il campo authorization fosse presente
    // divide la stringa Bearer SDHFKS... in due elementi e prende il secondo
    const token = authHeader && authHeader.split(' ')[1];
    
    // Mando un messaggio di errore al client perché il server non ha ricevuto un token
    if(!token) {
        return response.status(401).json({
            messaggio: 'Accesso non autorizzato.'
        })
    }

    jwt.verify(token, config.secretKey, async (err, datiToken) => {
        if (err) {
            // Il token non era valido
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }
        // Il token è valido

        if (datiToken.tipo != 'dati') {
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }

        const stringSQL = "SELECT id FROM users WHERE username = ? AND ruolo = 'administrator';";

        const [dati] = await pool.execute(stringSQL, [dati.username]);

        if(dati.length == 0) {
            return response.status(401).json({
                messaggio: 'Accesso non autorizzato.'
            })
        }
        else {
            // Token è valido e l'utente è amministratore
            next();
        }
    })
}

function userAuth(request, response, next) {
    // Leggere il campo presente nella richiesta http con nome authorization
    const authHeader = request.headers['authorization'];
    // Il valore deve essere scritto in questo modo: Bearer jSHDJSHFKSJKSHFJSK....
    // L'istruzione successiva controlla che il campo authorization fosse presente
    // divide la stringa Bearer SDHFKS... in due elementi e prende il secondo
    const token = authHeader && authHeader.split(' ')[1];
    
    // Mando un messaggio di errore al client perché il server non ha ricevuto un token
    if(!token) {
        return response.status(401).json({
            messaggio: 'Accesso non autorizzato.'
        })
    }

    jwt.verify(token, config.secretKey, async (err, user) => {
        if (err) {
            // Il token non era valido
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }
        // Il token è valido

        const stringSQL = "SELECT id FROM users WHERE username = ?;";

        const [dati] = await pool.execute(stringSQL, [user.username]);

        if(dati.length == 0) {
            return response.status(401).json({
                messaggio: 'Accesso non autorizzato.'
            })
        }
        else {
            // Token è valido e l'utente è amministratore
            next();
        }
    })
}

module.exports = {administratorAuth, userAuth}