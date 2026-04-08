# Airbean API – Dokumentation

### GET /

Välkomsttext

**Svar:** `200 OK`

```json
{
    "message": "Välkommen till grupp nr-6 API"
}
```

---

## Menu Routes

### GET /api/menu

Hämtar hela kaffemenyn

**Svar:** `200 OK`

```json
[
  {
    "id": "a3f1c9d2-7b4e-4a91-9c3e-2d8f6b5a1e77",
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "category":"coffee",
    "price": 39
  },
  {
    "id": "5d2a7f8c-1b3e-4c6a-8f92-0e4d9a7c3b11",
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "category":"coffee",
    "price": 49
  },
  {
    "id": "9b7e2c1d-6f3a-4d88-a1c5-3e9f7b2a6c44",
    "title": "Cappuccino",
    "desc": "Bryggd på månadens bönor.",
    "category":"coffee",
    "price": 49
  },
  {
    "id": "2f8a1d3c-5b7e-4e91-b2d6-8c3f1a9e7d55",
    "title": "Latte Macchiato",
    "desc": "Bryggd på månadens bönor.",
    "category":"coffee",
    "price": 49
  },
  {
    "id": "c1a9e7b3-4d2f-4f88-9e6a-1b3c5d7f2a66",
    "title": "Kaffe Latte",
    "desc": "Bryggd på månadens bönor.",
    "category":"coffee",
    "price": 54
  },
  {
    "id": "7e3b2c1a-9d4f-4a77-b8c1-6f2e3d9a5b77",
    "title": "Cortado",
    "desc": "Bryggd på månadens bönor.",
    "category":"coffee",
    "price": 39
  },
  {
    "id":"4c9a2f7d-1e3b-4b66-a9d2-5f7c3e1a8b88",
    "title":"Kanelbulle",
    "desc":"Ja, det är en bulle helt enkelt.",
    "category":"bun",
    "price":25
  }
]
```
**Fel:** `404 Not Found`
```json
{
    "error": "Kaffemenyn hittades inte"
}

```
**Fel:** `500 Internal Server Error`
```json
{
    "error": "Ett oväntat fel uppstod"
}
```
---

### GET /api/menu/:id

Hämtar ett specifikt meny id-nr

**Svar:** `200 OK`
```json
{
    "id": "c1a9e7b3-4d2f-4f88-9e6a-1b3c5d7f2a66",
    "title": "Kaffe Latte",
    "desc": "Bryggd på månadens bönor.",
    "price": 54
}
```

**Fel:** `404 Not Found`
```json
{
    "error": "Kaffesorten hittades inte"
}
```
**Fel:** `500 Internal Server Error`
```json
{
    "error": "Ett oväntat fel uppstod"
}
```

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


---

### GET /api/orders/status/:id

Skapar en ny beställning. Produkterna valideras i `validateOrder`-middleware innan ordern sparas.

**Body:**
```json
{
  "user_id": "user-123",
  "items": [
    { "product_id": 1, "quantity": 2, "price": 39 }
  ]
}

---

### GET /api/orders

Hämtar alla ordrar.

Svar: 200 OK

---

### GET /api/orders/status/:id

Visar orderstatus och hur många minuter som är kvar tills leverans.

Svar: 200 OK
Fel: 404 Not Found

---

GET /api/orders/user/:userId

Hämtar orderhistorik för en användare.

Svar: 200 OK
---
