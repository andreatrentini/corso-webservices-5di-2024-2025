const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./config'); 
const pool = require('./db');

const router = express.Router();

router.post('', async (request, response) => {
    //1. recupero le credenziali inviate dall'utente nel body
    let username = request.body.username;
    let password = request.body.password;

    //2. Controllo se nella tabella users è presente un utente con questo username
    const SQLstring = 'SELECT username, password, ruolo FROM users WHERE username = ?;';

    try {
       
        const [dati] = await pool.execute(SQLstring, [username]);
        if (!dati) {
            return response.status(401).json({
                messaggio: 'Username o password errati.'
            });
        }        
        // L'utente esiste
        let utente = dati[0];
        //3. controllo la password
        if(!bcrypt.compareSync(password, utente.password))
        {
            // La password è sbagliata
            return response.status(401).json({
                messaggio: 'Password non valida.'
            })
        }
        // Username e password sono corretti
        //4. Creo il token Bearer
        
        const tokenData = {
            username: username,
            ruolo: utente.ruolo
        }

        const token = jwt.sign(tokenData, config.secretKey, {expiresIn: config.durataTokenBearer});
        //5. Mando il token bearer al client
        return response.status(200).json({
            tipo: 'Bearer',
            durata: config.durataTokenBearer,
            token: token
        })
    }
    catch (error) {
        response.status(500).json({
            errore: 'Errore interno del server.',
            descrizione: error
        })
    }
})
module.exports = router;