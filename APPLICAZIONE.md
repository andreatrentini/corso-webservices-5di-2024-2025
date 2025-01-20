[<u>Back</u>](./README.md)

# l'Applicazione webservice

L'applicazione **Node.js Express** implementa un servizio web **RESTful CRUD (Create, Read, Update, Delete)** per gestire gli utenti e fornisce funzionalità di autenticazione e autorizzazione.

**Struttura dell'applicazione**

L'applicazione è organizzata in diversi file, ognuno con uno scopo specifico:

*   `app.js`: Definisce il punto di ingresso dell'applicazione e configura il server Express.
*   `auth.js`: Implementa le funzioni di autenticazione e autorizzazione.
*   `config.js`: Contiene le variabili di configurazione dell'applicazione.
*   `db.js`: Gestisce la connessione al database MySQL.
*   `init.js`: Fornisce un endpoint per inizializzare il database.
*   `json-check.js`: Verifica che i dati ricevuti dal client siano in formato JSON valido.
*   `login.js`: Gestisce l'autenticazione degli utenti.
*   `refresh.js`: Gestisce il refresh dei token di autenticazione.
*   `users.js`: Implementa gli endpoint per le operazioni CRUD sulla tabella degli utenti.
*   `utils.js`: Contiene funzioni di utilità utilizzate in diversi file.

**Funzionalità principali**

*   **Autenticazione e autorizzazione:** L'applicazione utilizza **JWT (JSON Web Token)** per l'autenticazione e l'autorizzazione. Gli utenti possono autenticarsi fornendo le proprie credenziali (username e password) all'endpoint `/login`. Se le credenziali sono valide, il server genera due token: un token di accesso (**Bearer token**) e un token di refresh. Il token di accesso viene utilizzato per autorizzare le richieste successive, mentre il token di refresh viene utilizzato per ottenere un nuovo token di accesso quando quello corrente scade. Sono definite due funzioni di middleware per l'autorizzazione: `administratorAuth` e `userAuth`. La prima verifica se l'utente è un amministratore, mentre la seconda verifica solo se l'utente è autenticato.
*   **Operazioni CRUD sugli utenti:** L'applicazione fornisce endpoint per creare, leggere, aggiornare ed eliminare gli utenti. Tutti gli endpoint relativi agli utenti richiedono l'autenticazione come amministratore.
*   **Inizializzazione del database:** L'endpoint `/init` consente di inizializzare il database eseguendo uno script SQL presente nel file system. Lo script crea le tabelle necessarie e inserisce l'utente amministratore.
*   **Gestione degli errori:** L'applicazione gestisce gli errori in modo appropriato, restituendo codici di stato HTTP significativi e messaggi di errore.
*   **Configurazione:** Le variabili di configurazione, come la porta del server, i dettagli di connessione al database e la chiave segreta per la firma dei token JWT, sono memorizzate nel file `config.txt`.

**Dipendenze**

L'applicazione utilizza diverse librerie di terze parti, tra cui:

*   **Express:** framework web per Node.js.
*   **MySQL2:** driver per la connessione a MySQL.
*   **bcrypt:** libreria per la crittografia delle password.
*   **jsonwebtoken:** libreria per la generazione e la verifica dei token JWT.
*   **express-validator:** libreria per la convalida dei dati ricevuti dal client.

**Note aggiuntive**

*   Il codice utilizza le **promise** e le funzioni **async/await** per gestire le operazioni asincrone, come l'interazione con il database.
*   Il file `utils.txt` contiene funzioni di utilità per la manipolazione dei dati, come la correzione dei dati ricevuti dal client e la generazione di stringhe SQL.
*   Il codice è ben documentato con commenti che spiegano il funzionamento di ogni parte dell'applicazione. 

**Conclusione**

## 1. app.js

Questo è il file principale dell'applicazione Express. Si occupa di configurare il server, inclusi i middleware necessari e le rotte.

```javascript
const express = require('express');
const cors = require('cors');
const config = require('./config');
const parseJSON = require('./json-check');
const rUsers = require('./users');
const rInit = require('./init');
const rLogin = require('./login');
const rRefresh = require('./refresh');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(parseJSON);
app.use('', express.static('public'));
app.use('/init', rInit);
app.use('/users', rUsers);
app.use('/login', rLogin);
app.use('/refresh', rRefresh);

const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta ' + config.port + '...');
});
```
- **cors()**: Abilita le richieste Cross-Origin Resource Sharing.
- **express.static('public')**: Serve file statici dalla directory 'public'.
- **parseJSON**: Un middleware personalizzato per assicurarsi che il body delle richieste sia in formato JSON valido.
- **Rotte**: Configura rotte specifiche per differenti funzionalità dell'app (inizializzazione, autenticazione, gestione utenti, ecc.).

## 2. auth.js

Questo file implementa funzioni di middleware per autenticare gli utenti usando token JWT.

```javascript
const jwt = require('jsonwebtoken');
const config = require('./config');
const pool = require('./db');

function administratorAuth(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return response.status(401).json({ messaggio: 'Accesso non autorizzato.' });
    }
    jwt.verify(token, config.secretKey, async (err, datiToken) => {
        if (err || datiToken.tipo != 'dati') {
            return response.status(401).json({ messaggio: 'Token non valido.' });
        }
        const [dati] = await pool.execute("SELECT id FROM users WHERE username = ? AND ruolo = 'administrator';", [datiToken.username]);
        if (dati.length == 0) {
            return response.status(401).json({ messaggio: 'Accesso non autorizzato.' });
        } else {
            next();
        }
    });
}

function userAuth(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return response.status(401).json({ messaggio: 'Accesso non autorizzato.' });
    }
    jwt.verify(token, config.secretKey, async (err, user) => {
        if (err) {
            return response.status(401).json({ messaggio: 'Token non valido.' });
        }
        const [dati] = await pool.execute("SELECT id FROM users WHERE username = ?;", [user.username]);
        if (dati.length == 0) {
            return response.status(401).json({ messaggio: 'Accesso non autorizzato.' });
        } else {
            next();
        }
    });
}

module.exports = { administratorAuth, userAuth };
```
- **jwt.verify()**: Verifica il token per autenticare gli utenti.
- **pool.execute()**: Esegue query al database per verificare i privilegi dell'utente.

## 3. config.js

Contiene le configurazioni per l'applicazione.

```javascript
const config = {
    port: 4444,
    initSecret: '12345',
    initDB: {
        host: 'dbserver',
        user: 'root',
        password: 'cisco',
        multipleStatements: true,
        port: 3306,
    },
    secretKey: 'pippoplutoepaperino',
    durataTokenBearer: 3600,
    durataTokenRefresh: 84600,
    saltOrRounds: 10,
    tabelle: {
        users: ['id', 'nome', 'cognome', 'indirizzo', 'cap', 'citta', 'provincia', 'telefono', 'cell', 'mail', 'username', 'password', 'ruolo']
    }
}

module.exports = config;
```
- **port**: La porta su cui il server sarà in ascolto.
- **secretKey**: Chiave segreta usata per firmare i token JWT.
- **initDB**: Configurazioni per la connessione al database.

## 4. db.js

Configura un pool di connessioni al database MySQL.

```javascript
const mysql = require('mysql2/promise');
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
```
- **createPool()**: Crea un pool di connessioni che migliora le performance gestendo multiple connessioni aperte al database.

## 5. init.js

Gestisce l'inizializzazione del database e la configurazione iniziale.

```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');
const config = require('./config');
const router = express.Router();

router.post('', async (request, response) => {
    let secret = request.body.secret;
    let adminPassword = request.body.adminpassword;
    if (secret === config.initSecret) {
        try {
            const scriptSQL = fs.readFileSync('./scripts/init.sql', 'utf8');
            let connessione = await mysql.createConnection(config.initDB);
            let result = await connessione.query(scriptSQL);
            let passwordCriptata = bcrypt.hashSync(adminPassword, config.saltOrRounds);
            const insertSQL = "INSERT INTO users (username, password, ruolo) VALUES ('admin', ?, 'administrator');";
            result = await connessione.query(insertSQL, passwordCriptata);
            await connessione.end();
            return response.status(200).send('Database inizializzato.');
        } catch (errore) {
            await connessione.end();
            return response.status(500).send(errore);
        }
    } else {
        response.status(403).send('Secret non presente o errata.');
    }
});

module.exports = router;
```
- **bcrypt.hashSync()**: Cripta la password dell'utente amministratore.
- **fs.readFileSync()**: Legge e esegue uno script SQL dal file system per inizializzare il database.

## 6. json-check.js

Middleware per verificare che i dati JSON ricevuti nelle richieste siano formattati correttamente.

```javascript
function parseJSON(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ messaggio: 'JSON malformato.' });
    }
    next();
}

module.exports = parseJSON;
```
- **SyntaxError**: Controlla se l'errore generato è a causa di un JSON malformato e, in tal caso, invia una risposta con errore 400.

## 7. login.js

Gestisce il processo di login, verificando le credenziali e rilasciando token di accesso e refresh.

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const pool = require('./db');
const router = express.Router();

router.post('', async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    const SQLstring = 'SELECT username, password, ruolo FROM users WHERE username = ?;';
    try {
        const [dati] = await pool.execute(SQLstring, [username]);
        if (!dati) {
            return response.status(401).json({ messaggio: 'Username o password errati.' });
        }
        let utente = dati[0];
        if (!bcrypt.compareSync(password, utente.password)) {
            return response.status(401).json({ messaggio: 'Password non valida.' })
        }
        const tokenPerDati = jwt.sign({ username: username, ruolo: utente.ruolo, tipo: 'dati' }, config.secretKey, { expiresIn: config.durataTokenBearer });
        const tokenPerRefresh = jwt.sign({ username: username, ruolo: utente.ruolo, tipo: 'refresh' }, config.secretKey, { expiresIn: config.durataTokenRefresh });
        return response.status(200).json({
            dati: {
                tipo: 'Bearer',
                durata: config.durata

TokenBearer,
                token: tokenPerDati
            },
            refresh: {
                tipo: 'Bearer',
                durata: config.durataTokenRefresh,
                token: tokenPerRefresh
            }
        });
    } catch (error) {
        response.status(500).json({ errore: 'Errore interno del server.', descrizione: error });
    }
});

module.exports = router;
```
- **bcrypt.compareSync()**: Verifica che la password inserita dall'utente corrisponda a quella criptata nel database.
- **jwt.sign()**: Genera un token JWT per l'utente autenticato.

## 8. promise.js

Fornisce esempi di come gestire le operazioni asincrone con le promesse in JavaScript.

```javascript
function getData() {
    return new Promise((resolved, rejected) => {
        let success = Math.random() > 0.3;
        setTimeout(() => {
            if (success) {
                resolved({ id: 1, nome: 'Chiara' });
            } else {
                rejected('Errore interno del server.');
            }
        }, 2000);
    });
}

function dataAsyncronus() {
    getData()
    .then(data => console.log('Ricevuti i dati in modo asincrono: ', data))
    .catch(errore => console.log('Errore nella ricezione dei dati asincrona: ', errore))
    .finally(() => console.log('Finally eseguito in entrambi i casi.'));
}

async function dataSyncronus() {
    try {
        console.log('Inizio a ricevere i dati...');
        const data = await getData();
        console.log('Dati ricevuti in modo sincrono: ', data);
    } catch (errore) {
        console.log('Errore nella ricezione dei dati sincrona: ', errore);
    }
}

console.log('Inizio operazioni asincrone...');
dataAsyncronus();
console.log('Fine operazioni asincrone.');

console.log('Inizio operazioni sincrone...');
dataSyncronus();
console.log('Fine operazioni sincrone.');
```
- **new Promise()**: Crea una nuova promessa che risolve o rifiuta basandosi su una condizione casuale.
- **getData()**: Funzione che simula il recupero dei dati in modo asincrono.

## 9. refresh.js

Gestisce il rinnovo dei token di accesso usando un token di refresh.

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');
const pool = require('./db');
const router = express.Router();

router.get('', async (request, response) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return response.status(401).json({ messaggio: 'Accesso non autorizzato.' });
    }
    jwt.verify(token, config.secretKey, async (err, refreshToken) => {
        if (err || refreshToken.tipo != 'refresh') {
            return response.status(401).json({ messaggio: 'Token non valido.' });
        }
        const [dati] = await pool.execute("SELECT id FROM users WHERE username = ? AND ruolo = ?;", [refreshToken.username, refreshToken.ruolo]);
        if (dati.length == 0) {
            return response.status(401).json({ messaggio: 'Accesso non autorizzato.' });
        } else {
            let utente = dati[0];
            const tokenPerDati = jwt.sign({ username: refreshToken.username, ruolo: utente.ruolo, tipo: 'dati' }, config.secretKey, { expiresIn: config.durataTokenBearer });
            return response.status(200).json({
                dati: {
                    tipo: 'Bearer',
                    durata: config.durataTokenBearer,
                    token: tokenPerDati
                },
                refresh: {
                    tipo: 'Bearer',
                    durata: config.durataTokenRefresh,
                    token: token
                }
            });
        }
    });
});

module.exports = router;
```
- **router.get()**: Definisce un endpoint GET che gestisce il rinnovo del token.
- **jwt.verify()**: Verifica il token di refresh per assicurare che sia valido prima di rilasciare un nuovo token di accesso.

## 10. users.js

Gestisce tutte le operazioni CRUD sulla tabella degli utenti, permettendo la creazione, lettura, aggiornamento e cancellazione degli utenti.

```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const config = require('./config');
const pool = require('./db');
const { administratorAuth } = require('./auth');
const { correctRequestData, getValues, setInsertFields, setInsertPlaceholders, setUpdateFields } = require('./utils');
const router = express.Router();

router.use(administratorAuth);

router.get('', async (request, response) => {
    try {
        const SQLstring = 'SELECT * FROM users;';
        const [dati] = await pool.execute(SQLstring);
        return response.status(200).send(dati);
    } catch (error) {
        return response.status(500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: error
        });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const dati = [id];
        const SQLstring = 'SELECT * FROM users WHERE id=?;';
        const [result] = await pool.execute(SQLstring, dati);
        return response.status(200).send(result);
    } catch (error) {
        return response.status 500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: error
        });
    }
});

router.post('', [
    body('username').notEmpty().withMessage('Username deve essere not null'),
    body('password').notEmpty().withMessage('Password deve essere not null'),
    body('ruolo').notEmpty().withMessage('Ruolo deve essere not null')
], async (request, response) => {
    const errori = validationResult(request);
    if (!errori.isEmpty()) {
        return response.status 400).json({
            errori: errori.array()
        });
    }

    try {
        const bodyCorretto = correctRequestData(request.body, 'users');
        const dati = getValues(bodyCorretto);
        const SQLstring = 'INSERT INTO users ' + setInsertFields(bodyCorretto) + ' VALUES ' + setInsertPlaceholders(bodyCorretto) + ';';
        const result = await pool.execute(SQLstring, dati);
        return response.status 200).send(result);
    } catch (errore) {
        return response.status 500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: errore
        });
    }
});

router.put('/:id', async (request, response) => {
    const id = request.params.id;

    try {
        const bodyCorretto = correctRequestData(request.body, 'users');
        const dati = getValues(bodyCorretto);
        dati.push(id);
        const SQLstring = 'UPDATE users SET ' + setUpdateFields(bodyCorretto) + ' WHERE id = ?';
        const result = await pool.execute(SQLstring, dati);
        return response.status 200).send(result);
    } catch (errore) {
        return response.status 500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: errore
        });
    }
});

router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const SQLstring = 'DELETE FROM users WHERE id=?';
    const dati = [id];
    try {
        const result = await pool.execute(SQLstring, dati);
        return response.status 200).send(result);
    } catch (errore) {
        return response.status 500).json({
            messaggio: 'Errore interno del server MYSQL.',
            errore: errore
        });
    }
});

module.exports = router;
```
- **router.get(), router.post(), router.put(), router.delete()**: Definiscono le operazioni CRUD sulla tabella degli utenti.
- **bcrypt**: Utilizzato per criptare le password prima di memorizzarle nel database.
- **body() e validationResult()**: Utilizzati per validare i dati in ingresso nelle richieste.

## 10. utils.js
Il file `utils.txt` contiene una serie di funzioni di utilità che supportano le operazioni CRUD per il tuo backend Node.js usando Express. Queste funzioni aiutano a manipolare i dati delle richieste, costruire query SQL dinamicamente e gestire le operazioni con il database in modo più efficiente. Ecco una guida dettagliata sulle funzioni presenti nel file:

### 1. **correctRequestData(body, table)**
Questa funzione prende due parametri: `body`, che rappresenta il corpo della richiesta, e `table`, il nome della tabella per la quale i dati devono essere verificati. Utilizza la configurazione definita in `config.tabelle` per filtrare e restituire solo i campi validi per la tabella specificata.

- **Processo:**
  - Estrae le chiavi (nomi dei campi) dal `body`.
  - Filtra queste chiavi per mantenere solo quelle definite nella configurazione della tabella corrispondente in `config.tabelle`.
  - Costruisce un nuovo oggetto contenente solo i campi validi.

### 2. **getColumns(dati)**
Questa funzione accetta un oggetto e restituisce un array contenente i nomi delle sue proprietà. È utile per generare dinamicamente le parti delle query SQL che richiedono l'elenco delle colonne.

### 3. **getValues(dati)**
Simile a `getColumns`, questa funzione prende un oggetto e restituisce un array dei suoi valori. È usata per costruire l'array di valori da passare alle query SQL preparate.

### 4. **setInsertFields(dati)**
Genera una stringa contenente le colonne per una query SQL `INSERT`, basata sui campi presenti nell'oggetto `dati`. Questo è utilizzato per costruire la parte della query che specifica in quali colonne inserire i dati.

- **Formato Output:** `(nome, cognome, ...)`

### 5. **setInsertPlaceholders(dati)**
Crea una stringa di segnaposto SQL (`?`) per una query `INSERT`, basata sul numero di campi presenti nell'oggetto `dati`. Questo aiuta a costruire la parte della query che accetta i valori effettivi da inserire.

- **Formato Output:** `(?, ?, ...)`

### 6. **setUpdateFields(dati)**
Genera una stringa per una query SQL `UPDATE`, combinando i nomi dei campi con i segnaposto per i valori. È utile per costruire query di aggiornamento dinamiche basate sugli oggetti dati.

- **Formato Output:** `nome=?, cognome=?, ...`

### Utilizzo delle Funzioni
Queste funzioni sono essenziali per costruire query SQL in modo sicuro e dinamico, evitando hard-coding e facilitando la manutenzione e l'aggiornamento del codice. Ad esempio, quando ricevi una richiesta per aggiornare un record utente, puoi usare queste funzioni per validare e preparare i dati prima di eseguire la query:

```javascript
const express = require('express');
const router = express.Router();
const db = require('./db'); // Assume a module for database operations
const utils = require('./utils');

router.post('/update-user', async (req, res) => {
    try {
        const userData = utils.correctRequestData(req.body, 'users');
        const query = `UPDATE users SET ${utils.setUpdateFields(userData)} WHERE id = ?`;
        const values = [...utils.getValues(userData), req.body.id];
        await db.execute(query, values);
        res.send('User updated successfully.');
    } catch (error) {
        res.status(500).send('Error updating user.');
    }
});

module.exports = router;
```

[<u>Back</u>](./README.md)