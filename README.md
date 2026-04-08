# Airbean API Dokumentation

## Projektbeskrivning

Airbean API hanterar användarregistrering, menysystem och orderhantering för kaffebeställningar.
Systemet använder API-nycklel för att säkerställa att endast auktoriserade klienter kan kommunicera med tjänsten.

## Teknikstack

- **Runtime:** Node.js
- **Databas:** SQLite
- **Ramverk:** Express
- **Verktyg:** UUID.env
- **Verktyg:** Nodemon

## Installation & start


## Klona repot
```bash
git clone https://github.com/WilliamEngman24/Airbean.git
cd Airbean
```
## Installera beroenden
```bash
npm install
```
## Skapa .env (kopiera från .env.example)
```bash
cp .env.example .env
# Fyll i dina värden i .env
```
## Starta servern
```bash
node server.js

Servern startar på localhost:3000 (http://localhost:3000) (eller den port du angett i `.env`).
```
## API-endpoints

[API Dokumentation](api-docs.md)

## WebSocket-diskussion

Genom att uppkoppla drönare till internet genom wifi kan drönarens position updateras i realtid. Detta skulle kräva Websockets då dess kordinater bör anges konstant eller med en liten tidsinterval. Detta skapar en server/klient relation där drönarna blir klienterna som behöver uppkolpas till en server. 

## Gruppmedlemmar

- Robin
- Pontus
- Tommy
- William
