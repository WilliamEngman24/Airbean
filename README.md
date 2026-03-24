# Airbean API Dokumentation

## Projektbeskrivning

## Teknikstack

- Node.js
- SQLite
- Express
- UUID

## Installation & start

```bash
# Klona repot
git clone [repo-url]
cd [projektmapp]

# Installera beroenden
npm install

# Skapa .env (kopiera från .env.example)
cp .env.example .env
# Fyll i dina värden i .env

# Starta servern
node server.js
# eller med --watch:
node --watch server.js
```
Servern startar på `http://localhost:3000` (eller den port du angett i `.env`).

## API-endpoints

[API Dokumentation](api-docs.md)

## WebSocket-diskussion

Genom att uppkoppla drönare till internet genom wifi kan drönarens position updateras i realtid. Detta skulle kräva Websockets då dess kordinater bör anges konstant eller med en liten tidsinterval. Detta skapar en server/klient relation där drönarna blir klienterna som behöver uppkolpas till en server. 

## Gruppmedlemmar

- Robin
- Pontus
- Tommy
- William
