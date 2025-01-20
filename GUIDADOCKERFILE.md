[<u>Back</u>](./README.md)

# DOCKERFILE

Un Dockerfile è un file di testo che contiene una sequenza di istruzioni necessarie per costruire un'immagine Docker, che poi può essere usata per eseguire container Docker. Questo file è fondamentale nell'ecosistema Docker poiché automatisa il processo di creazione dell'immagine, rendendolo ripetibile e coerente, elementi essenziali soprattutto in ambienti di produzione e sviluppo collaborativo.

## Origine e Importanza

Docker utilizza i Dockerfile per automatizzare il processo di creazione di immagini, eliminando la necessità di esecuzioni manuali e configurazioni ad hoc, e assicurando che l'ambiente di esecuzione del software sia sempre configurato allo stesso modo, indipendentemente da chi costruisce l'immagine o dove viene eseguita.

## Come Funziona

Un Dockerfile è composto da una serie di istruzioni, ciascuna delle quali aggiunge un layer all'immagine finale. Ogni istruzione nel Dockerfile modifica lo stato dell'immagine e viene salvata come un layer intermedio, che Docker può riutilizzare per accelerare future costruzioni dell'immagine. Le istruzioni comuni includono:

- `FROM` per indicare l'immagine di base.
- `RUN` per eseguire comandi che installano pacchetti o configurano il sistema.
- `COPY` e `ADD` per copiare file e directory dall'host al filesystem dell'immagine.
- `CMD` per definire il comando di default eseguito all'avvio del container.
- `EXPOSE` per indicare le porte su cui il container sarà in ascolto.

## Vantaggi dell'Uso di Dockerfile

**Consistenza**: Il Dockerfile garantisce che ogni volta che l'immagine viene ricostruita, il processo sarà eseguito esattamente allo stesso modo, riducendo gli errori causati da configurazioni manuali diverse.

**Versionamento e Revisione**: I Dockerfile possono essere versionati e mantenuti in sistemi di controllo versione come Git, permettendo agli sviluppatori di tenere traccia delle modifiche e di collaborare più efficacemente.

**Automazione**: La costruzione di immagini può essere automatizzata e integrata in pipeline CI/CD, migliorando l'efficienza dello sviluppo e del rilascio del software.

**Isolamento e Sicurezza**: Le immagini costruite con Dockerfile possono essere eseguite in modo isolato, contribuendo a migliorare la sicurezza delle applicazioni riducendo l'esposizione e la superficie di attacco.

## Come si usa

Creare immagini Docker efficienti e funzionali richiede un'accurata comprensione di come scrivere un Dockerfile. Ecco una guida dettagliata che copre ogni aspetto fondamentale, dalla scelta dell'immagine di base alla configurazione avanzata e alle best practices per la manutenzione e la sicurezza.

### 1. Scegliere l'Immagine di Base

L'immagine di base (`FROM`) è il punto di partenza di ogni Dockerfile. È cruciale scegliere un'immagine che sia sia leggera sia supportata a lungo termine. Esempi comuni includono `ubuntu`, `alpine`, e immagini specifiche per linguaggi come `node`, `python`, `ruby`, ecc.

```dockerfile
FROM python:3.9-slim
```

### 2. Gestione delle Dipendenze

Utilizza l'istruzione `RUN` per installare le dipendenze necessarie. È una buona pratica elencare le dipendenze in modo esplicito e raggruppare i comandi per minimizzare il numero di strati.

```dockerfile
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
```

In questo esempio, `rm -rf /var/lib/apt/lists/*` pulisce la cache per ridurre le dimensioni dell'immagine.

### 3. Copiare i File nel Container

Utilizza `COPY` per trasferire i file del tuo progetto nel container. Se devi aggiungere file da URL o scompattare archivi direttamente, usa `ADD`.

```dockerfile
COPY . /app
```

### 4. Configurare Variabili d'Ambiente

Le variabili d'ambiente (`ENV`) sono utili per configurare il software all'interno del container in modo dinamico.

```dockerfile
ENV APP_HOME /app
WORKDIR $APP_HOME
```

### 5. Esposizione delle Porte

Con `EXPOSE` puoi indicare quale porta il container utilizzerà. Questo non pubblica la porta, ma serve come documentazione e per configurare il networking tra container.

```dockerfile
EXPOSE 5000
```

### 6. Definire Comandi di Esecuzione

`CMD` e `ENTRYPOINT` sono due istruzioni che definiscono i comandi di default del container. `CMD` fornisce i default per un container eseguibile, mentre `ENTRYPOINT` dovrebbe essere usato per configurare il container come un comando o un servizio.

```dockerfile
CMD ["flask", "run"]
```

Se usi `ENTRYPOINT`, i parametri specificati in `CMD` saranno passati ad esso.

### 7. Ottimizzazione e Manutenzione

- **Minimizzare le immagini**: Cerca di ridurre le dimensioni dell'immagine finali utilizzando immagini base minimali e rimuovendo file non necessari.
- **Multistage builds**: Utilizza costruzioni in più fasi per tenere separati gli ambienti di build e di esecuzione.

```dockerfile
FROM python:3.9-slim as builder
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt

FROM python:3.9-slim
COPY --from=builder /wheels /wheels
RUN pip install --no-cache /wheels/*
```

- **Security**: Usa sempre versioni non privilegiate dell'utente nel container per prevenire attacchi che sfruttano i permessi elevati.

```dockerfile
USER nobody
```

- **Caching**: Organizza le istruzioni per sfruttare la cache dei layer Docker, ad esempio copiando i file di requisiti prima del resto del codice per evitare di reinstallare le dipendenze ogni volta che cambia il codice sorgente.

### Conclusioni

In conclusione, il Dockerfile è uno strumento potente e versatile per la gestione di applicazioni in container. Offre un metodo standardizzato e automatizzato per la creazione di immagini Docker, essenziale per lo sviluppo moderno di applicazioni e per l'operatività di sistemi scalabili e distribuiti. Utilizzare un Dockerfile è ormai considerato una best practice nell'ambito dello sviluppo software basato su container.

[<u>Back</u>](./README.md)