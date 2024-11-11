function getData() {
    return new Promise((resolved, rejected) => {
        // Metodo per simulare la stato resolved o rejected della nostra promise
        let success = Math.random() > 0.3;
        // Simuliamo un servizio che impiega tempo per essere eseguito
        setTimeout(() => {
            if(success) {
                // La promise viene risolta con successo
                const data = {
                    id: 1,
                    nome: 'Chiara'
                }
                resolved(data);
            }
            else {
                rejected('Errore interno del server.')
            }
        }, 2000)

    })
}

function dataAsyncronus() {
    getData()
    .then((data => {
        console.log('Ricevuti i dati in modo asincrono: ', data)
    }))
    .catch(errore => {
        console.log('Errore nella ricezione dei dati asincrona: ', errore)
    })
    .finally(() => {
        console.log('Finally eseguito in entrambi i casi.')
    })
}

async function dataSyncronus() {
    try {
        console.log('Inizio a ricevere i dati...')
        const data = await getData();
        console.log('Dati ricevuti in modo sincrono: ', data);
    }
    catch (errore) {
        console.log('Errore nella ricezione dei dati sincrona: ', errore);
    }
}

console.log('Inizio operazioni asincrone...');
dataAsyncronus();
console.log('Fine operazioni asincrone.');

console.log('Inizio operazioni sincrone...');
dataSyncronus();
console.log('Fine operazioni sincrone.');