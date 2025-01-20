[<u>Back</u>](./README.md)

# Docker compose

Docker Compose è uno strumento che permette di definire e gestire applicazioni multi-container con Docker. Utilizzando un file YAML, Docker Compose consente di configurare i servizi, le reti e i volumi necessari per un'applicazione, semplificando il processo di deployment e testing in ambienti locali e di produzione. Ecco una guida dettagliata su come utilizzare Docker Compose.

## Installazione di Docker Compose

Prima di tutto, è necessario installare Docker Compose. Docker Compose è incluso in Docker Desktop per Windows e Mac, ma su Linux, deve essere installato separatamente. Ecco come si può fare:

1. **Scarica l'ultima versione di Docker Compose**:

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

2. **Rendi il binario eseguibile**:

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Verifica l'installazione**:

   ```bash
   docker-compose --version
   ```

## docker-compose.yml

Creare un file `docker-compose.yml` ricco di funzionalità e ottimizzato richiede una comprensione approfondita di tutti gli oggetti e le opzioni disponibili. Qui troverai una guida dettagliata su ogni aspetto che puoi configurare in un file `docker-compose.yml`, partendo dalla versione `3.8`, una delle più usate e stabili per la produzione.

## Sintassi

### 1. Indentazione

L'indentazione è essenziale in formati come YAML (usato in Docker Compose)

- **Regole base**: 
  - Utilizza spazi invece di tabulazioni. Questo evita problemi di compatibilità e interpretazione errata del codice su differenti editor o ambienti.
  - La quantità standard di spazi per livello di indentazione è tipicamente di 2 o 4 spazi. Assicurati di seguire le convenzioni adottate dal tuo team o progetto.
  - Mantieni l'indentazione consistente attraverso tutto il file per evitare errori di sintassi e rendere il codice più leggibile.

- **Esempio in YAML**:
  ```yaml
  version: '3.8'
  services:
    web:
      image: nginx:latest
      ports:
        - "80:80"
  ```

### 2. Definizione di Array

Gli array, o liste, sono collezioni ordinate 

Gli array in YAML sono definiti con un trattino (`-`) seguito da uno spazio. Ogni elemento dell'array si trova su una nuova riga con lo stesso livello di indentazione.

```yaml
  ports:
    - "80:80"
    - "443:443"
    - "8080:8080"
  ```

### 3. Variabili d'Ambiente

Le variabili d'ambiente sono utilizzate per configurare il comportamento di programmi e applicazioni senza modificare il codice sorgente.

- **Docker Compose (YAML)**:
  Puoi definire variabili d'ambiente in un servizio Docker Compose utilizzando l'elemento `environment` o un file esterno indicato da `env_file`.

  ```yaml
  services:
    app:
      environment:
        DEBUG: "true"
        DB_HOST: db
  ```

  Oppure, puoi specificare un file `.env`:

  ```yaml
  services:
    app:
      env_file: 
        - ./.env
  ```

- **.env file**:
  Un file `.env` contiene le variabili d'ambiente in forma di `NOME_VARIAVILE=valore`.

  ```
  DEBUG=true
  DB_HOST=db
  ```

### 4. Nomi dei File

I nomi dei file sono cruciali per l'organizzazione del codice e dei dati. Segui queste best practices:

- **Consistenza**: Utilizza una convenzione consistente per i nomi dei file, come `camelCase`, `PascalCase`, o `snake_case`.
- **Descrittivi**: I nomi dei file dovrebbero essere descrittivi e riflettere il loro contenuto o funzione.
- **Evita spazi**: Utilizza trattini (`-`) o underscore (`_`) invece di spazi nei nomi dei file.
- **Estensioni**: Assicurati che i file abbiano le estensioni appropriate per indicare il loro formato o tipo, come `.txt`, `.py`, `.yaml`, ecc.

Esempio di buona pratica per nomi di file:

- `config.yaml`
- `database_init_script.sql`
- `load_data.py`

## Struttura del file

### 1. Versione
La `version` specifica la versione della sintassi Docker Compose utilizzata nel file. È importante scegliere la versione corretta per assicurarsi che Docker Compose interpreti il file come previsto.

```yaml
version: '3.8'
```

### 2. Services
Il cuore di ogni file `docker-compose.yml` è la sezione `services`, dove definisci i container che devono essere eseguiti.

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    depends_on:
      - db
  db:
    image: postgres:latest
    environment:
      POSTGRES_DB: mydatabase
```

#### Options per Services:

- **image**: Specifica l'immagine da usare per il container.
- **build**: Può essere una stringa che specifica il percorso di un Dockerfile o un oggetto con più opzioni come `context` e `dockerfile`.
- **command**: Sovrascrive il comando di default specificato nell'immagine.
- **environment**: Imposta variabili d'ambiente nel container.
- **env_file**: Carica le variabili d'ambiente da un file esterno.
- **ports**: Espone le porte del container all'host.
- **volumes**: Monta volumi nel container.
- **depends_on**: Specifica le dipendenze tra servizi.
- **deploy**: Specifiche relative al deployment, utili in ambienti swarm.

### 3. Networks
Le `networks` permettono di definire e configurare reti custom.

```yaml
networks:
  app-network:
    driver: bridge
```

#### Options per Networks:
- **driver**: Specifica il driver di rete, come `bridge`, `overlay`, `none`.

### 4. Volumes
I `volumes` permettono di persistere e condividere dati tra container e tra esecuzioni di container.

```yaml
volumes:
  db-data:
    driver: local
```

#### Options per Volumes:
- **driver**: Specifica il driver di gestione dei volumi, come `local` o plugin di terze parti.

### 5. Configs
Le `configs` permettono di gestire configurazioni esterne, utili in ambienti swarm.

```yaml
configs:
  my_config:
    file: ./config.txt
```

#### Options per Configs:
- **file**: Percorso del file di configurazione da caricare.

### 6. Secrets
I `secrets` sono utilizzati per gestire dati sensibili, come password.

```yaml
secrets:
  db_password:
    file: ./password.txt
```

#### Options per Secrets:
- **file**: Percorso del file da cui caricare il segreto.

### Best Practices e Considerazioni Avanzate
- **Gestire configurazioni complesse**: Usa `env_file` e `configs` per separare le configurazioni dall'immagine e migliorare la sicurezza.
- **Uso di `depends_on`**: Mentre specifica l'ordine di avvio, non attende che un servizio sia "pronto" prima di avviare il successivo. Potresti necessitare di uno script di attesa o di health checks.
- **Orchestrazione**: In produzione, considera l'uso di Docker Swarm o Kubernetes per la gestione di servizi definiti in `docker-compose.yml`.

## Gestione dell'Applicazione con Docker Compose

Dopo aver configurato il file `docker-compose.yml`, puoi gestire l'applicazione con i seguenti comandi:

- **Avviare i servizi**: 

  ```bash
  docker-compose up
  ```

  Aggiungi `-d` per eseguirli in background.

- **Fermare i servizi**:

  ```bash
  docker-compose down
  ```

  Questo comando ferma e rimuove i container, la rete predefinita, e l'opzione `-v` rimuove anche i volumi.

- **Visualizzare i log**:

  ```bash
  docker-compose logs
  ```

- **Eseguire comandi in un servizio**:

  ```bash
  docker-compose exec service_name bash
  ```

  Sostituisci `service_name` con il nome del servizio dove vuoi eseguire il comando.

## Best Practices per Docker Compose

- **Gestione configurazione**: Usa variabili d'ambiente per gestire le configurazioni che cambiano tra i diversi ambienti.
- **Dockerignore**: Crea un file `.dockerignore` per escludere file non necessari dai context di build.
- **Ricompilazione di immagini**: Usa `docker-compose up --build` per forzare la ricompilazione delle immagini se cambiano i Dockerfile o i contesti di build.
- **Separazione di ambienti**: Utilizza file `docker-compose` differenti per ambienti di sviluppo, test e produzione.

### Conclusioni

Docker Compose è un potente strumento che semplifica notevolmente la gestione di applicazioni Dockerizzate, rendendo più facile che mai configurare, testare e distribuire applicazioni complesse. Con una solida comprensione di come funzionano i file `docker-compose.yml` e l'abilità di manipolare servizi attraverso comandi Compose, puoi migliorare significativamente i flussi di lavoro di sviluppo e deployment.

[<u>Back</u>](./README.md)