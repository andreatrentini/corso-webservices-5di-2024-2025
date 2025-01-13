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

// Esport la costante config in modo che possa essere utilizzata in altri file javascript
module.exports = config;