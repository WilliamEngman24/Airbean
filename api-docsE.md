# Airbean API Dokumentation

## Projektbeskrivning

## Teknikstack

## Installation & start

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

### GET /api/beans/:id

Hämtar en specifik kaffe böna.

**Svar:** `200 OK`

```json
{ "id": 1, "title": "Interstellar", "year": 2014, "genre": "Sci-Fi" }
```

**Fel:** `404 Not Found`

```json
{ "fel": "Bönan hittades inte" }
```

---

### POST /api/beans

Skapar en ny kaffe böna.

**Body:**

```json
{
  "title": "Dune",
  "year": 2021,
  "genre": "Sci-Fi"
}
```

Alla fält är obligatoriska.

**Svar:** `201 Created`

```json
{ "id": 3, "title": "Dune", "year": 2021, "genre": "Sci-Fi" }
```

**Fel:** `400 Bad Request`

```json
{ "fel": "title, year och genre är obligatoriska" }
```

---

### PUT /api/beans/:id

Uppdaterar en befintlig kaffe böna.

**Body:**

```json
{
  "title": "Interstellar",
  "year": 2014,
  "genre": "Drama"
}
```

**Svar:** `200 OK` med det uppdaterade objektet.

**Fel:** `404 Not Found` | `400 Bad Request`

---

### DELETE /api/beans/:id

Tar bort en kaffe böna.

**Svar:** `204 No Content` (tom body)

**Fel:** `404 Not Found`

```json
{ "fel": "Bönan hittades inte" }
```

## WebSocket-diskussion
