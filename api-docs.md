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
**Fel:** `401 Unauthorized`
```json
{
    "error": "Invalid API key"
}
```

---

### GET /api/menu/:id

Hämtar ett specifikt id-nr från menyn

**Svar:** `200 OK`
```json
{
    "id": "5",
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
**Fel:** `401 Unauthorized`
```json
{
    "error": "Invalid API key"
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

## User Routes

### GET /api/users

Hämtar alla användare.

**Svar:** `200 OK`

```json
[
  {
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
  "username": "old_user",
  "email": "old@example.com",
  "user_date": "2026-03-30T11:40:23.845Z"
  },
  {
  "id": "b8c9d0e1-f2g3-h4i5-j6k7-l8m9n0o1p2q3",
  "username": "John_Smith",
  "email": "notai@example.com",
  "user_date": "2026-03-30T11:40:23.845Z"
  },
  {
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfa",
  "username": "Jane_Doe",
  "email": "mightbeai@example.com",
  "user_date": "2026-03-30T11:40:23.845Z"
  }
]
```

**Fel:** `500 Internal Server Error`

```json
{ "error": "Kunde inte hämta alla användare" }
```

---

### GET /api/users/:id

Hämtar en specifik användare.

**Svar:** `200 OK`

```json
{
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
  "username": "John_Smith",
  "email": "notanai@example.com",
  "user_date": "2026-03-30T11:40:23.845Z"
}
```

**Fel:** `404 Not Found`

```json
{ "error": "Kunde inte hämta denna användare" }
```

---

### POST /api/users

Skapar en ny användare

**Body:**

```json
{
  "username": "new_person",
  "email": "newemail@gmail.com"
}
```

Alla fält är obligatoriska.

**Svar:** `201 Created`

```json
{
  "id": "468f758c-ab3e-4b2a-83d6-7214c79eb7a6",
  "username": "new_person",
  "email": "newemail@gmail.com",
  "user_date": "2026-04-01T10:06:29.197Z"
}
```

**Fel:** `400 Bad Request`

```json
{
  "error": "Kunde inte skapa användare. Alla fält måste fyllas i."
}
```

---

### PUT /api/users/:id

Uppdaterar användarinformation.

**Body:**

```json
{
  "username": "old_user",
  "email": "old@gmail.com"
}
```

**Svar:** `200 OK`

```json
{
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
  "username": "updated_user",
  "email": "updated@gmail.com",
  "user_date": "2026-03-30T11:40:23.845Z"
}
```

**Fel:** 
`404 Not Found`

```json
{ "error": "Kunde inte hämta denna användare" }
```
ELLER

`400 Bad Request`

```json
{
  "error": "Kunde inte skapa användare. Alla fält måste fyllas i."
}
```

---

### DELETE /api/users/:id

Tar bort en användare. Om en användare tas bort, raderas också dess orders och kopplade order items.

**Svar:** `204 No Content` (tom body)

**Fel:** `404 Not Found`

```json
{
  "error": "Användare hittades inte"
}
```
