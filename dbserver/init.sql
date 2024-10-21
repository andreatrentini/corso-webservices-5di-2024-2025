# Creo un nuovo database
CREATE DATABASE dbapp;

CREATE DATABASE db1;

CREATE DATABASE db2;

# Seleziono il database nel quale creare le tabelle
USE dbapp;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(30),
    cognome VARCHAR(30),
    indirizzo VARCHAR(50),
    cap CHAR(5),
    citta VARCHAR(50),
    provincia CHAR(2),
    telefono VARCHAR(20),
    cell VARCHAR(20),
    mail VARCHAR(100),
    username VARCHAR(20) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE logs (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    event VARCHAR(200),
    eventtime TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('admin', 'cisco');
INSERT INTO logs (event, eventtime) VALUES ('DB init', NOW());