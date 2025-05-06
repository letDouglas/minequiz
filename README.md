
# MineQuiz

MineQuiz è un'applicazione interattiva che combina il mondo di Minecraft con un quiz coinvolgente. Ogni domanda è arricchita da effetti visivi e animazioni per rendere l'esperienza ancora più divertente e immersiva.

## Contenuto

- [Introduzione](#introduzione)
- [Anteprima dell'App](#anteprima-dellapp)
- [Requisiti](#requisiti)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Struttura del Progetto](#struttura-del-progetto)
- [Configurazione e Avvio](#configurazione-e-avvio)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Contesto dell'App](#contesto-dellapp)

## Introduzione

MineQuiz è progettato per gli appassionati di Minecraft che vogliono mettere alla prova le loro conoscenze e divertirsi allo stesso tempo. Le domande coprono una vasta gamma di argomenti, dalle basi alle curiosità più avanzate, rendendo il quiz adatto sia ai principianti che agli esperti.

## 📸 Anteprima dell'App

Una breve panoramica visiva di MineQuiz:

### 🏠 Homepage
![Homepage](assets/home.png)

### ❓ Domanda Quiz
![Quiz](assets/quiz.png)

### 📞 Schermata Contatti
![Contatti](assets/contact.png)

### ℹ️ Schermata Info
![About](assets/about.png)

## Requisiti

Prima di iniziare, assicurati di avere installato i seguenti software:

- **Docker** e **Docker Compose**: per la gestione dei container.
- **Node.js** e **npm**: per il frontend Angular.
- **Angular CLI**: per il frontend Angular.
- **Java Development Kit (JDK)** (versione 11 o superiore): per il backend Spring Boot.
- **Maven** o **Gradle**: per la gestione delle dipendenze del backend.

### Installazione dei Requisiti

#### Docker e Docker Compose

**Linux**:
```sh
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Windows/Mac**: Scarica e installa Docker Desktop dal sito ufficiale di Docker.

#### Node.js e npm

**Linux**:
```sh
sudo apt-get update
sudo apt-get install -y nodejs npm
```

**Windows/Mac**: Scarica e installa Node.js dal sito ufficiale di [Node.js](https://nodejs.org).

#### Angular CLI

Installazione globale:
```sh
npm install -g @angular/cli
```

#### JDK

**Linux**:
```sh
sudo apt-get update
sudo apt-get install openjdk-11-jdk
```

**Windows/Mac**: Scarica e installa il JDK dal sito ufficiale di Oracle o utilizza AdoptOpenJDK.

#### Maven

**Linux**:
```sh
sudo apt-get update
sudo apt-get install maven
```

**Windows/Mac**: Scarica e installa Maven dal sito ufficiale di [Apache Maven](https://maven.apache.org).

## Tecnologie Utilizzate

- **Backend**: Spring Boot, MongoDB
- **Frontend**: Angular, Tailwind CSS
- **Containerizzazione**: Docker, Docker Compose

## Struttura del Progetto

```
minequiz/
│
├── docker-compose.yml
├── minequiz-api/
│   └── ... (codice backend)
├── minequiz-ui/
│   └── ... (codice frontend)
└── README.md
```

## Configurazione e Avvio

### Backend

Il backend è sviluppato con Spring Boot e utilizza MongoDB come database.

**Configurazione Docker**:
1. Assicurati di avere Docker e Docker Compose installati.
2. Avvia il container MongoDB:
```sh
docker-compose up -d
```

**Configurazione Spring Boot**:
1. Apri il progetto `minequiz-api` in un IDE (IntelliJ IDEA, VSCode, Eclipse).
2. Verifica che `application.properties` contenga:

```
spring.application.name=minequiz-api
spring.data.mongodb.uri=mongodb://ttf:1234@localhost:27017/minequizdb?authSource=admin
server.port=8080
logging.level.org.springframework.data.mongodb=DEBUG
logging.level.com.minequiz.api=DEBUG
```

3. Avvia l'applicazione Spring Boot.  
   L'API sarà disponibile su `http://localhost:8080`.

### Frontend

Il frontend è sviluppato con Angular e utilizza Tailwind CSS.

**Installazione Angular CLI** (se non è già installato):
```sh
npm install -g @angular/cli
```

**Avvio Angular**:
1. Naviga nella cartella `minequiz-ui`:
```sh
cd minequiz-ui
```

2. Installa le dipendenze:
```sh
npm install
```

3. Avvia l'applicazione:
```sh
ng serve
```

L'applicazione sarà disponibile su `http://localhost:4200`.

## Contesto dell'App

### Perché scegliere MineQuiz?

MineQuiz è molto più di un semplice quiz. È un viaggio attraverso il mondo di Minecraft, un modo per imparare cose nuove e divertirsi allo stesso tempo. Ogni domanda è accompagnata da effetti visivi e animazioni per rendere l'esperienza ancora più coinvolgente.

Mettiti alla prova e scopri se sei un vero GrandMaster di Minecraft. Le domande spaziano dalle informazioni di base alle curiosità più avanzate, coprendo tutte le versioni del gioco e le sue espansioni.

Che tu voglia sfidare i tuoi amici o semplicemente migliorare le tue conoscenze, MineQuiz è il posto giusto per te!  
Sfidati a superare i livelli più difficili, scopri nuove curiosità su Minecraft e diventa il campione del quiz.
