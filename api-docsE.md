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

### GET /api/beans

Hämtar alla kaffe bönor.

**Svar:** `200 OK`

```json
[
  { "id": 1, "title": "Interstellar", "year": 2014, "genre": "Sci-Fi" },
  { "id": 2, "title": "The Dark Knight", "year": 2008, "genre": "Action" }
]
```

---

### GET /api/beans

[Vad endpointen gör]

**Svar:** `200 OK`

```json
[exempelsvar]
```

---

### GET /api/beans/:id

[Vad endpointen gör]

**Svar:** `200 OK`
**Fel:** `404 Not Found`

---

### POST /api/beans

[Vad endpointen gör]

**Body:**

```json
{
  "fält1": "värde",
  "fält2": "värde"
}
```

**Svar:** `201 Created`
**Fel:** `400 Bad Request`

---

### PUT /api/beans/:id

[Vad endpointen gör]

**Body:** [samma som POST]
**Svar:** `200 OK`
**Fel:** `404 Not Found` | `400 Bad Request`

---

### DELETE /api/beans/:id

[Vad endpointen gör]

**Svar:** `204 No Content`
**Fel:** `404 Not Found`

## WebSocket-diskussion

## Gruppmedlemmar

- Robin
- Pontus
- Tommy
- William
