# Airbean API – Dokumentation

### GET /api

Välkomsttext

**Svar:** `200 OK`

```json
{
    "message": "Välkommen till grupp nr-6 API"
}
```

---

### GET /api/menu

Hämtar hela kaffemenyn

**Svar:** `200 OK`
**Fel:** `404 Kaffemenyn hittades inte`
**Fel:** `500 Ett oväntat fel uppstod`

```json
[
  {
    "id": "1",
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "id": "2",
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "id": "3",
    "title": "Cappuccino",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "id": "4",
    "title": "Latte Macchiato",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "id": "5",
    "title": "Kaffe Latte",
    "desc": "Bryggd på månadens bönor.",
    "price": 54
  },
  {
    "id": "6",
    "title": "Cortado",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  }
]
```

---

### GET /api/menu/5

Hämtar ett specifikt menyid

**Svar:** `200 OK`
**Fel:** `404 Kaffesorten hittades inte`
**Fel:** `500 Ett oväntat fel uppstod`

```json
{
    "id": "5",
    "title": "Kaffe Latte",
    "desc": "Bryggd på månadens bönor.",
    "price": 54
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
