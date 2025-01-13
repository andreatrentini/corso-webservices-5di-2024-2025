# Corso webservices 5Di 2024/2025

## Docker
Docker è una piattaforma di virtualizzazione a livello di sistema operativo, conosciuta anche come "containerizzazione". Permette agli sviluppatori di impacchettare un'applicazione con tutte le parti necessarie, come librerie e dipendenze, e distribuirla come un unico pacchetto o container. Questo container può essere eseguito su qualsiasi sistema che ha Docker installato, indipendentemente dall'ambiente sottostante, il che aiuta ad eliminare il problema del "funziona sul mio computer".

Alcune caratteristiche chiave di Docker includono:

1. **Portabilità**: I container Docker possono essere eseguiti su qualsiasi sistema operativo che supporta Docker, che può essere una macchina locale, un server di produzione, o anche un cloud.
2. **Isolamento**: Ogni container Docker è isolato dagli altri e dal sistema ospite. Un container ha il suo ambiente e set di risorse, che gli permette di operare indipendentemente.
3. **Leggerezza**: I container Docker condividono il kernel del sistema operativo ospitante ma possono essere limitati a usare una certa quantità di risorse come CPU e memoria. Questo li rende molto più leggeri rispetto alle macchine virtuali tradizionali.
4. **Scalabilità e gestibilità**: Docker facilita la scalabilità delle applicazioni. È possibile utilizzare strumenti di orchestrazione come Kubernetes per gestire, scalare e distribuire automaticamente i container Docker.

Docker è ampiamente utilizzato per lo sviluppo di applicazioni, il testing, e la produzione, offrendo un modo consistente e affidabile per eseguire il software.

# Guida ai Comandi Principali di Docker

## 1. `docker run`

**Descrizione:** Esegue un comando in un nuovo container.

**Sintassi:**

```bash
docker run [opzioni] immagine [comando] [argomenti]
```

**Esempio:**

```bash
docker run hello-world
```

---

## 2. `docker pull`

**Descrizione:** Scarica un'immagine da un repository Docker.

**Sintassi:**

```bash
docker pull [opzioni] nome_immagine[:tag]
```

**Esempio:**

```bash
docker pull ubuntu:latest
```

---

## 3. `docker images`

**Descrizione:** Elenca le immagini Docker presenti sul sistema.

**Sintassi:**

```bash
docker images [opzioni]
```

**Esempio:**

```bash
docker images
```

---

## 4. `docker ps`

**Descrizione:** Elenca i container in esecuzione.

**Sintassi:**

```bash
docker ps [opzioni]
```

**Esempio:**

```bash
docker ps -a
```

_L'opzione `-a` mostra tutti i container, inclusi quelli non in esecuzione._

---

## 5. `docker stop`

**Descrizione:** Ferma uno o più container in esecuzione.

**Sintassi:**

```bash
docker stop [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker stop mio_container
```

---

## 6. `docker start`

**Descrizione:** Avvia uno o più container fermati.

**Sintassi:**

```bash
docker start [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker start mio_container
```

---

## 7. `docker rm`

**Descrizione:** Rimuove uno o più container.

**Sintassi:**

```bash
docker rm [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker rm mio_container
```

---

## 8. `docker rmi`

**Descrizione:** Rimuove una o più immagini dal sistema.

**Sintassi:**

```bash
docker rmi [opzioni] NOME_IMMAGINE/ID_IMMAGINE
```

**Esempio:**

```bash
docker rmi ubuntu:latest
```

---

## 9. `docker build`

**Descrizione:** Costruisce un'immagine Docker da un Dockerfile.

**Sintassi:**

```bash
docker build [opzioni] percorso
```

**Esempio:**

```bash
docker build -t mio_progetto:1.0 .
```

_L'opzione `-t` assegna un tag all'immagine creata._

---

## 10. `docker exec`

**Descrizione:** Esegue un comando in un container in esecuzione.

**Sintassi:**

```bash
docker exec [opzioni] NOME_CONTAINER/ID_CONTAINER comando
```

**Esempio:**

```bash
docker exec -it mio_container /bin/bash
```

_L'opzione `-it` permette l'accesso interattivo al container._

---

## 11. `docker logs`

**Descrizione:** Recupera i log di un container.

**Sintassi:**

```bash
docker logs [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker logs mio_container
```

---

## 12. `docker inspect`

**Descrizione:** Fornisce informazioni dettagliate su container o immagini.

**Sintassi:**

```bash
docker inspect NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker inspect mio_container
```

---

## 13. `docker push`

**Descrizione:** Carica un'immagine in un repository Docker.

**Sintassi:**

```bash
docker push NOME_IMMAGINE[:tag]
```

**Esempio:**

```bash
docker push mio_username/mia_immagine:latest
```

---

## 14. `docker tag`

**Descrizione:** Assegna un nuovo tag a un'immagine Docker.

**Sintassi:**

```bash
docker tag ID_IMMAGINE NOME_IMMAGINE[:tag]
```

**Esempio:**

```bash
docker tag 123456789abc mio_username/mia_immagine:latest
```

---

## 15. `docker network`

**Descrizione:** Gestisce le reti Docker.

**Sintassi:**

```bash
docker network [comando] [opzioni]
```

**Esempio per creare una rete:**

```bash
docker network create mia_rete
```

---

## 16. `docker volume`

**Descrizione:** Gestisce i volumi Docker.

**Sintassi:**

```bash
docker volume [comando] [opzioni]
```

**Esempio per creare un volume:**

```bash
docker volume create mio_volume
```

---

## 17. `docker-compose`

**Descrizione:** Strumento per definire ed eseguire applicazioni multi-container con Docker.

**Esempio per avviare i servizi definiti in un file `docker-compose.yml`:**

```bash
docker-compose up
```

## Descrizione di Container e Immagini in Docker

### Immagini Docker

Un'**immagine Docker** è un modello immutabile (read-only) che contiene tutto il necessario per eseguire un'applicazione, compreso il codice, le librerie, le dipendenze, i file di configurazione e le variabili d'ambiente. Le immagini sono costruite a strati utilizzando un Dockerfile, che è uno script contenente una serie di istruzioni su come assemblare l'immagine.

- **Stratificazione:** Ogni istruzione nel Dockerfile crea un nuovo strato nell'immagine. Questo approccio consente di riutilizzare gli strati comuni tra diverse immagini, ottimizzando lo spazio su disco e accelerando i tempi di build.
- **Portabilità:** Le immagini possono essere condivise attraverso registri pubblici o privati, come Docker Hub, permettendo una distribuzione semplice e consistente delle applicazioni.

### Container Docker

Un **container Docker** è un'istanza eseguibile di un'immagine Docker. I container sono ambienti isolati che eseguono un'applicazione e le sue dipendenze, utilizzando le risorse del sistema operativo host ma mantenendo un isolamento rispetto ad altri container e processi.

- **Isolamento:** I container utilizzano funzionalità del kernel come namespace e cgroups per isolare i processi, garantendo che le applicazioni non interferiscano tra loro.
- **Leggerezza:** A differenza delle macchine virtuali, i container condividono il kernel del sistema operativo host, rendendoli molto più leggeri e veloci da avviare.
- **Efficienza:** Permettono di eseguire più istanze di un'applicazione sullo stesso host senza la necessità di overhead aggiuntivo.

### Relazione tra Immagini e Container

- **Creazione di Container:** Un container viene creato a partire da un'immagine. Quando esegui `docker run`, Docker prende l'immagine specificata e la utilizza per creare e avviare un nuovo container.
- **Immutabilità vs. Mutabilità:** Le immagini sono immutabili; non cambiano una volta create. I container, invece, possono avere uno stato mutabile, ad esempio dati generati o modifiche durante l'esecuzione.
- **Persistenza dei Dati:** Se desideri che i dati generati all'interno di un container persistano oltre il ciclo di vita del container stesso, è comune utilizzare volumi o bind mounts.

### Esempio Pratico

1. **Costruzione di un'Immagine:**

   Supponiamo di avere un'applicazione Node.js. Crei un Dockerfile che specifica l'ambiente Node necessario e come installare le dipendenze dell'applicazione.

   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY package.json ./
   RUN npm install
   COPY . .
   CMD ["node", "app.js"]
   ```

   Costruisci l'immagine con:

   ```bash
   docker build -t mia_applicazione .
   ```

2. **Esecuzione di un Container:**

   Una volta costruita l'immagine, puoi creare ed eseguire un container basato su di essa:

   ```bash
   docker run -d -p 3000:3000 mia_applicazione
   ```

   Questo comando avvia un container che esegue la tua applicazione Node.js, mappando la porta 3000 del container alla porta 3000 dell'host.

### Conclusione

In sintesi, le **immagini Docker** sono i modelli da cui vengono creati i container, contenenti tutto il necessario per eseguire un'applicazione. I **container Docker** sono le istanze eseguibili di queste immagini, che possono essere avviate, fermate, spostate e cancellate. Questa separazione tra immagine e container offre grande flessibilità e efficienza nella gestione e distribuzione delle applicazioni.

Docker network è una funzionalità potente di Docker che permette di gestire le reti dei container, facilitando la comunicazione tra container e il mondo esterno. Ecco una breve guida su come utilizzare le reti in Docker.

## Docker network

### 1. Concetti Base
- **Network Driver**: Docker utilizza diversi driver di rete per gestire la comunicazione tra i container. I più comuni sono `bridge`, `host`, `overlay`, e `macvlan`.
- **Bridge**: Il driver predefinito che crea una rete privata interna al host per i container.
- **Host**: Rimuove l'isolamento di rete tra i container e il sistema host.
- **Overlay**: Collega più demoni Docker su diversi host.
- **Macvlan**: Permette ai container di apparire come dispositivi fisici, assegnando loro indirizzi MAC.

### 2. Gestione delle Reti
Per gestire le reti Docker, si utilizzano comandi base come segue:

- **Visualizzare le reti**:
  ```bash
  docker network ls
  ```
  
- **Creare una rete**:
  ```bash
  docker network create --driver <driver_name> <network_name>
  ```
  Dove `<driver_name>` può essere `bridge`, `overlay`, ecc., e `<network_name>` è il nome che si desidera dare alla rete.

- **Ispezionare una rete**:
  ```bash
  docker network inspect <network_name>
  ```
  Fornisce informazioni dettagliate sulla configurazione della rete.

- **Rimuovere una rete**:
  ```bash
  docker network rm <network_name>
  ```
  Questo comando elimina la rete specificata.

- **Eliminare le reti non usate**:
  ```bash
  docker network prune
  ```
  Questo comando elimina la rete specificata.

### 3. Collegare i Container alle Reti
Per collegare i container a una rete creata, usa il comando:

```bash
docker run --network <network_name> -d --name <container_name> <image>
```
Dove `<network_name>` è il nome della rete a cui collegare il container, `<container_name>` è il nome da assegnare al container, e `<image>` è l'immagine da cui il container verrà creato.

Per i container già in esecuzione è possibile usare il comando:

```bash
docker network connect [OPTIONS] NETWORK CONTAINER
```

### 4. Comunicazione tra Container
I container sulla stessa rete possono comunicare tra loro usando i nomi dei container come indirizzi DNS. Per esempio, se un container chiamato `web` deve accedere a un database su un altro container chiamato `db` sulla stessa rete, può semplicemente usare il nome `db` per la connessione. Il server DNS è disponibile solo se si usano reti diverse da bridge.

### 5. Debugging
Per diagnosticare problemi di rete, Docker fornisce comandi come:

- **Eseguire un ping tra i container**:
  ```bash
  docker exec <container_name> ping <target_container_name>
  ```
  Questo comando è utile per verificare la connettività tra due container.

Questa guida copre i concetti essenziali per iniziare a lavorare con Docker network, fornendo le basi per configurare e gestire la comunicazione tra i container in modo efficace.

## Gestione dei volumi

I volumi in Docker sono un meccanismo essenziale per la gestione dei dati in applicazioni containerizzate. Offrono una soluzione per persistere i dati generati e utilizzati dai container, indipendentemente dal ciclo di vita del container stesso. Ecco una breve guida per comprendere e utilizzare i volumi in Docker.

### 1. Introduzione ai Volumi Docker

Un volume Docker è una directory (o un insieme di file) che viene gestita da Docker e montata all'interno di uno o più container. A differenza del volume binding, che mappa direttamente una directory dell'host a una del container, i volumi sono completamente gestiti da Docker, il che li rende più sicuri e portatili.

### 2. Creare un Volume

Puoi creare un volume usando il comando `docker volume create`. Questo comando crea un nuovo volume che può essere montato in uno o più container.

```bash
docker volume create mio_volume
```

### 3. Usare un Volume in un Container

Per usare un volume in un container, puoi specificarlo nel comando `docker run` usando l'opzione `--mount`. Ecco un esempio:

```bash
docker run -d \
  --name mio_container \
  --mount source=mio_volume,target=/path/container \
  nome_immagine
```

In questo esempio, `mio_volume` è il nome del volume che hai creato, e `/path/container` è il percorso all'interno del container dove il volume sarà accessibile.

### 4. Elenca e Gestisci Volumi

Per vedere un elenco di tutti i volumi su un sistema Docker, puoi usare il comando:

```bash
docker volume ls
```

Se hai bisogno di più dettagli su un particolare volume, puoi usare:

```bash
docker volume inspect nome_volume
```

### 5. Rimuovere un Volume

Per rimuovere un volume non più utilizzato, è importante assicurarsi che non ci siano container attivi che lo stanno utilizzando. Dopo aver verificato, puoi rimuoverlo con:

```bash
docker volume rm nome_volume
```

### 6. Vantaggi dell'Uso dei Volumi

- **Persistenza dei Dati:** I volumi assicurano che i dati importanti sopravvivano alla distruzione dei container e possano essere riutilizzati.
- **Sicurezza:** I volumi sono gestiti e isolati da Docker, il che può aumentare la sicurezza rispetto al volume binding diretto con il file system dell'host.
- **Portabilità:** I volumi possono essere facilmente trasferiti o clonati tra host, facilitando la migrazione e il backup.

### 7. Migliori Pratiche

- **Backup regolari:** Anche se i volumi sono persistenti, è importante avere strategie di backup per proteggere i dati critici.
- **Monitoraggio dello spazio su disco:** Mantieni sotto controllo l'utilizzo dello spazio su disco per evitare di esaurirlo, soprattutto in ambienti di produzione.

Con queste informazioni, dovresti essere in grado di gestire efficacemente i volumi in Docker, sfruttando la loro potenzialità per migliorare la gestione dei dati nelle tue applicazioni containerizzate.

## Backup di volumi docker

Effettuare il backup dei volumi Docker è cruciale per garantire la sicurezza dei dati importanti delle tue applicazioni containerizzate. Qui di seguito, ti fornisco una guida passo-passo per implementare una strategia di backup efficace per i volumi Docker.

### 1. Identifica i Volumi da Fare Backup

Prima di tutto, devi identificare quali volumi necessitano di backup. Puoi elencare tutti i volumi presenti sul tuo sistema con il seguente comando:

```bash
docker volume ls
```

### 2. Eseguire il Backup di un Volume

#### **Opzione 1: Backup Manuale**

Puoi fare un backup manuale di un volume Docker copiando i suoi dati in un'altra locazione sul sistema host o su un dispositivo di archiviazione esterno.

1. **Trova il percorso del volume**: Usa il comando `docker volume inspect` per trovare il percorso effettivo del volume sul sistema host.

    ```bash
    docker volume inspect nome_volume --format '{{ .Mountpoint }}'
    ```

2. **Copia i dati**: Usa il comando `cp` o `rsync` per copiare i dati dal percorso del volume a una locazione sicura.

    ```bash
    sudo rsync -avzh /var/lib/docker/volumes/nome_volume/_data/ /percorso/backup/
    ```

#### **Opzione 2: Backup Automatico Utilizzando uno Script**

Puoi automatizzare il processo di backup utilizzando uno script che esegue periodicamente il backup dei tuoi volumi.

- **Crea uno script di backup**: Scrivi uno script che identifichi automaticamente tutti i volumi e ne copi i contenuti in una directory di backup. Assicurati di schedulare l'esecuzione dello script tramite cron o un altro gestore di task automatici.

    Esempio di script:
    ```bash
    #!/bin/bash
    backup_dir="/path/to/backup"

    docker volume ls -q | while read volume; do
        src_dir="$(docker volume inspect "$volume" --format '{{ .Mountpoint }}')"
        dest_dir="$backup_dir/$volume"
        mkdir -p "$dest_dir"
        rsync -av "$src_dir/" "$dest_dir/"
    done
    ```

    Schedula lo script con `cron`:
    ```bash
    # Esegui lo script ogni giorno alle 2:00 AM
    0 2 * * * /path/to/your/script.sh
    ```

### 3. Gestire e Verificare i Backup

Dopo aver implementato la tua strategia di backup, è importante gestire i file di backup e verificare periodicamente che i dati siano integri e recuperabili.

- **Verifica l'integrità dei backup**: Assicurati che i dati nei backup siano completi e non corrotti. Potresti considerare di eseguire test di ripristino periodici.
- **Rotazione dei backup**: Implementa una politica di rotazione per mantenere diverse generazioni di backup, eliminando quelli vecchi per liberare spazio.

### 4. Considerazioni Finali

- **Sicurezza**: Assicurati che i tuoi backup siano protetti da accessi non autorizzati, utilizzando crittografia e controlli di accesso adeguati.
- **Cloud Storage**: Per aumentare la resilienza, considera l'opzione di memorizzare i backup su piattaforme di storage cloud, che offrono solitamente strumenti avanzati di gestione e sicurezza dei dati.

Seguendo questi passaggi, puoi assicurarti di avere una strategia solida e affidabile per il backup dei tuoi volumi Docker, proteggendo così i dati critici delle tue applicazioni containerizzate.

## Volume binding vs directory binding

Il "volume binding" è una funzionalità di Docker che permette di mappare una directory sul sistema host in un container, rendendo possibile la condivisione e la persistenza dei dati tra l'host e il container. Questo può essere particolarmente utile per lo sviluppo di applicazioni, il testing, e la gestione di configurazioni o dati che necessitano di essere mantenuti tra diverse esecuzioni del container. Ecco una breve guida sull'uso del volume binding in Docker.

### 1. Definire il Volume Binding

Quando esegui un container Docker, puoi specificare un binding di volume utilizzando l'opzione `-v` o `--mount` nel comando `docker run`. L'opzione `-v` è più breve e usata comunemente, mentre `--mount` è più verbosa ma consente configurazioni più dettagliate.

**Esempio con `-v`:**

```bash
docker run -v /path/host:/path/container nome_immagine
```

**Esempio con `--mount`:**

```bash
docker run --mount type=bind,source=/path/host,target=/path/container nome_immagine
```

In entrambi gli esempi, `/path/host` è il percorso della directory sul sistema host che vuoi mappare, mentre `/path/container` è il percorso all'interno del container dove la directory sarà accessibile.

### 2. Scegliere tra Volume Binding e Volume Docker

Il binding di un volume è diretto e mappa esattamente una directory dell'host dentro al container. I volumi Docker, d'altra parte, sono gestiti da Docker e possono essere più sicuri e portatili. Per applicazioni in produzione, è spesso preferibile utilizzare volumi Docker.

**Volume Binding:**
- Ideale per lo sviluppo e il testing.
- Facile da configurare.
- Dipendente dal sistema file dell'host.

**Volume Docker:**
- Gestito da Docker.
- Migliore isolamento e sicurezza.
- Facile da backuppare e migrare.

### 3. Consigli per l'uso sicuro dei Volume Bindings

- **Permessioni:** Assicurati che le permessioni dei file sul host siano correttamente impostate per prevenire accessi non autorizzati.
- **Sicurezza:** Evita di esporre dati sensibili tramite volume binding se il sistema host è condiviso o esposto a rischi di sicurezza.
- **Backup:** Implementa strategie di backup per i dati importanti mantenuti su volumi, dato che i dati possono essere persi se il container viene configurato erroneamente.

### 4. Monitoraggio e Gestione

Monitorare lo spazio su disco usato dai volumi e la loro performance è essenziale, specialmente in ambienti di produzione. Docker non pulisce automaticamente i volumi non utilizzati, quindi potrebbe essere necessario gestirli manualmente per evitare di esaurire lo spazio su disco.

Con queste basi, dovresti essere in grado di utilizzare efficacemente il volume binding in Docker per sviluppare, testare e gestire le applicazioni in modo più efficace e flessibile.
