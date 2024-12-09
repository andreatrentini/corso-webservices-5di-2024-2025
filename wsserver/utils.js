const config = require('./config');

function correctRequestData(body, table) {
/*     console.log(body);
    const fields = Object.keys(body);
    console.log(fields);    
    const corretti = fields.filter(field => config.tabelle[table].includes(field));
    console.log(corretti);
    const oggettoCorretto = corretti.reduce((oggettoDaRicostruire, field) => {
        oggettoDaRicostruire[field] = body[field]
        return oggettoDaRicostruire;
    }, {});
    console.log(oggettoCorretto);
    return; */
    return Object.keys(body)
            .filter(field => config.tabelle[table].includes(field))
            .reduce((newObject, field) => {
                newObject[field] = body[field];
                return newObject;
            }, {})
}

function getColumns(dati) {
    return Object.keys(dati);
}

function getValues(dati) {
    return Object.values(dati);
}

function setInsertFields(dati) {
    // (nome, cognome, ....)
    return '('+ getColumns(dati).join(', ') + ')';
}

function setInsertPlaceholders(dati) {
    
}


module.exports = { correctRequestData }