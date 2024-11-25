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
    
    if(!token) {
        return response.status(401).json({
            messaggio: 'Accesso non autorizzato'
        })
    }

    

}