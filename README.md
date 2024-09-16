# Corso webservices 5Di 2024/2025

## Docker
Docker è una piattaforma di virtualizzazione a livello di sistema operativo, conosciuta anche come "containerizzazione". Permette agli sviluppatori di impacchettare un'applicazione con tutte le parti necessarie, come librerie e dipendenze, e distribuirla come un unico pacchetto o container. Questo container può essere eseguito su qualsiasi sistema che ha Docker installato, indipendentemente dall'ambiente sottostante, il che aiuta ad eliminare il problema del "funziona sul mio computer".

Alcune caratteristiche chiave di Docker includono:

1. **Portabilità**: I container Docker possono essere eseguiti su qualsiasi sistema operativo che supporta Docker, che può essere una macchina locale, un server di produzione, o anche un cloud.
2. **Isolamento**: Ogni container Docker è isolato dagli altri e dal sistema ospite. Un container ha il suo ambiente e set di risorse, che gli permette di operare indipendentemente.
3. **Leggerezza**: I container Docker condividono il kernel del sistema operativo ospitante ma possono essere limitati a usare una certa quantità di risorse come CPU e memoria. Questo li rende molto più leggeri rispetto alle macchine virtuali tradizionali.
4. **Scalabilità e gestibilità**: Docker facilita la scalabilità delle applicazioni. È possibile utilizzare strumenti di orchestrazione come Kubernetes per gestire, scalare e distribuire automaticamente i container Docker.

Docker è ampiamente utilizzato per lo sviluppo di applicazioni, il testing, e la produzione, offrendo un modo consistente e affidabile per eseguire il software.

## Guida ai Comandi Principali di Docker

1. docker run
Descrizione: Esegue un comando in un nuovo container.

Sintassi:

bash
Copia codice
docker run [opzioni] immagine [comando] [argomenti]
Esempio:

bash
Copia codice
docker run hello-world
2. docker pull
Descrizione: Scarica un'immagine da un repository Docker.

Sintassi:

bash
Copia codice
docker pull [opzioni] nome_immagine[:tag]
Esempio:

bash
Copia codice
docker pull ubuntu:latest
3. docker images
Descrizione: Elenca le immagini Docker presenti sul sistema.

Sintassi:

bash
Copia codice
docker images [opzioni]
Esempio:

bash
Copia codice
docker images
4. docker ps
Descrizione: Elenca i container in esecuzione.

Sintassi:

bash
Copia codice
docker ps [opzioni]
Esempio:

bash
Copia codice
docker ps -a
L'opzione -a mostra tutti i container, inclusi quelli non in esecuzione.

5. docker stop
Descrizione: Ferma uno o più container in esecuzione.

Sintassi:

bash
Copia codice
docker stop [opzioni] NOME_CONTAINER/ID_CONTAINER
Esempio:

bash
Copia codice
docker stop mio_container
6. docker start
Descrizione: Avvia uno o più container fermati.

Sintassi:

bash
Copia codice
docker start [opzioni] NOME_CONTAINER/ID_CONTAINER
Esempio:

bash
Copia codice
docker start mio_container
7. docker rm
Descrizione: Rimuove uno o più container.

Sintassi:

bash
Copia codice
docker rm [opzioni] NOME_CONTAINER/ID_CONTAINER
Esempio:

bash
Copia codice
docker rm mio_container
8. docker rmi
Descrizione: Rimuove una o più immagini dal sistema.

Sintassi:

bash
Copia codice
docker rmi [opzioni] NOME_IMMAGINE/ID_IMMAGINE
Esempio:

bash
Copia codice
docker rmi ubuntu:latest
9. docker build
Descrizione: Costruisce un'immagine Docker da un Dockerfile.

Sintassi:

bash
Copia codice
docker build [opzioni] percorso
Esempio:

bash
Copia codice
docker build -t mio_progetto:1.0 .
L'opzione -t assegna un tag all'immagine creata.

10. docker exec
Descrizione: Esegue un comando in un container in esecuzione.

Sintassi:

bash
Copia codice
docker exec [opzioni] NOME_CONTAINER/ID_CONTAINER comando
Esempio:

bash
Copia codice
docker exec -it mio_container /bin/bash
L'opzione -it permette l'accesso interattivo al container.

11. docker logs
Descrizione: Recupera i log di un container.

Sintassi:

bash
Copia codice
docker logs [opzioni] NOME_CONTAINER/ID_CONTAINER
Esempio:

bash
Copia codice
docker logs mio_container
12. docker inspect
Descrizione: Fornisce informazioni dettagliate su container o immagini.

Sintassi:

bash
Copia codice
docker inspect NOME_CONTAINER/ID_CONTAINER
Esempio:

bash
Copia codice
docker inspect mio_container
13. docker push
Descrizione: Carica un'immagine in un repository Docker.

Sintassi:

bash
Copia codice
docker push NOME_IMMAGINE[:tag]
Esempio:

bash
Copia codice
docker push mio_username/mia_immagine:latest
14. docker tag
Descrizione: Assegna un nuovo tag a un'immagine Docker.

Sintassi:

bash
Copia codice
docker tag ID_IMMAGINE NOME_IMMAGINE[:tag]
Esempio:

bash
Copia codice
docker tag 123456789abc mio_username/mia_immagine:latest
15. docker network
Descrizione: Gestisce le reti Docker.

Sintassi:

bash
Copia codice
docker network [comando] [opzioni]
Esempio per creare una rete:

bash
Copia codice
docker network create mia_rete
16. docker volume
Descrizione: Gestisce i volumi Docker.

Sintassi:

bash
Copia codice
docker volume [comando] [opzioni]
Esempio per creare un volume:

bash
Copia codice
docker volume create mio_volume
17. docker-compose
Descrizione: Strumento per definire ed eseguire applicazioni multi-container con Docker.

Esempio per avviare i servizi definiti in un file docker-compose.yml:

bash
Copia codice
docker-compose up
Conclusione
Questi comandi fondamentali ti aiuteranno a iniziare con Docker e a gestire efficacemente i tuoi container e le tue immagini. Per approfondire ulteriormente, consulta la documentazione ufficiale di Docker.
