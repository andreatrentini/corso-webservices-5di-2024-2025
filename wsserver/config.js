const config = {
    port: 4444,
    initSecret: '12345',
    initDB: {
        host: 'dbserver',
        user: 'root',
        password: 'cisco',
        multipleStatements: true,
        port: 3306
    },
    saltOrRounds: 10
}

// Esport la costante config in modo che possa essere utilizzata in altri file javascript
module.exports = config;