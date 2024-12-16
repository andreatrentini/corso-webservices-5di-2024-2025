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
    // Il metodo keys estrae il nome delle proprietà di un oggetto e le memorizza in un array che viene restituito
    // l'array viene poi filtrato tenendo solo i nomi delle proprietà che sono presenti in config.tabelle.nometabella
    // NB: in javascript si può utilizzare la sintassi prevista per gli array oggetto[nomeproprietà]
    // I'array delle proprietà filtrate viene poi usato con la funzione reduce, che restituisce un nuovo oggetto che presenta le coppie chiave-valore
    // dei soli campi presenti in config.tabelle[nometabella]
    return Object.keys(body)
            .filter(field => config.tabelle[table].includes(field))
            .reduce((newObject, field) => {
                newObject[field] = body[field];
                return newObject;
            }, {})
}

function getColumns(dati) {
    // Ottengo un array con i nomi delle proprietà dell'oggetto passato come parametro (dati)
    return Object.keys(dati);
}

function getValues(dati) {
    // Ottengo un array con i valori delle proprietà dell'oggetto passato come parametro (dati)
    return Object.values(dati);
}

function setInsertFields(dati) {
    // (nome, cognome, ....)
    return '('+ getColumns(dati).join(', ') + ')';
}

function setInsertPlaceholders(dati) {
    return '(' + getColumns(dati).map(() => '?').join(', ') +')'
}

function setUpdateFields(dati) {
    return getColumns(dati).map(field => field + '=?').join(', ');
}


module.exports = { correctRequestData, getColumns, getValues, setInsertFields, setInsertPlaceholders, setUpdateFields }