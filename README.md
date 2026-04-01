# Airbean API Dokumentation

## Projektbeskrivning

## Teknikstack

- **Runtime:** Node.js
- **Databas:** SQLite
- **Ramverk:** Express
- **Verktyg:** UUID.env

## Installation & start


# Klona repot
```bash
git clone [repo-url]
cd [projektmapp]
```
# Installera beroenden
```bash
npm install
```
# Skapa .env (kopiera från .env.example)
```bash
cp .env.example .env
# Fyll i dina värden i .env
```
# Starta servern
```bash
node server.js
node --watch server.js
Servern startar på `http://localhost:3000` (eller den port du angett i `.env`).
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
