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

## User Routes

### GET /api/users

Hämtar alla användare.

**Svar:** `200 OK`

```json
[
  {
  "id": "2a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
  "username": "old_user",
  "email": "old@example.com",
  "user_date": "2026-03-30T11:40:23.845Z"
  },
  {
  "id": "b7c6d5e4-3f2a-4f66-a9b8-7e6d5c4b3a88",
  "username": "John_Smith",
  "email": "notai@example.com",
  "user_date": "2026-03-30T11:40:23.845Z"
  },
  {
  "id": "f1e2d3c4-b5a6-4a55-8c7d-9e0f1a2b3c99",
  "username": "Jane_Doe",
  "email": "maybeai@example.com",
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
  "id": "b7c6d5e4-3f2a-4f66-a9b8-7e6d5c4b3a88",
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
  "id": "6f4c2d91-8a3e-4b7f-9c12-5d8e1a6b4f90",
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

### PATCH /api/users/:id

Uppdaterar användarinformation. Både username och email kan ändras separat eller på samma gång.

**Sparad användare**

```json
{
  "id": "2a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
  "username": "old_user",
  "email": "old@gmail.com",
  "user_date": "2026-03-30T11:40:23.845Z"
}
```

**Body:**

```json
{
  "username": "updated_user"
}
```

**Svar:** `200 OK`

```json
{
  "id": "2a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
  "username": "updated_user",
  "email": "old@gmail.com",
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
  "error": "Kunde inte skapa användare. Något fält måste fyllas i."
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

## Order Routes

### GET /api/orders

Hämtar alla beställningar.

**Svar:** `200 OK`

```json
[
  {
    "id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
    "user_id": "2a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
    "total_price": 93,
    "ETA": 17,
    "order_date": "2026-04-02T08:30:04.699Z"
  }
]
```

**Fel:** `500 Internal Server Error`

```json
{ "error": "Kunde inte hämta alla beställningar" }
```

---

### GET /api/orders/status/:id

Hämtar en specifik beställning.

**Svar:** `200 OK`

```json
{
  "order_id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
  "ETA": 17,
  "minutes_left": 0
}
```

**Fel:** `404 Not Found`

```json
{ "error": "Order inte hittad" }
```

### GET /api/orders/users/:userId

Hämtar alla beställningar för en användare.

**Svar:** `200 OK`

```json
{
  "id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
  "user_id": "a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
  "total_price": 93,
  "ETA": 17,
  "order_date": "2026-04-02T08:30:04.699Z"
}
```

**Fel:** `404 Not Found`

```json
{ "error": "Inga beställningar hittade för denna användare" }
```

### GET /api/orders/:id

Hämtar information om en beställning.

**Svar:** `200 OK`

```json
{
  "order": {
      "id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
      "user_id": "2a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
      "total_price": 93,
      "ETA": 17,
      "order_date": "2026-04-02T08:30:04.699Z"
  },
  "items": [
      {
          "id": "3d9a7c1b-8e2f-4b00-a1c7-5f3e9d2a6c44",
          "order_id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
          "product_id": "4c9a2f7d-1e3b-4b66-a9d2-5f7c3e1a8b88",
          "quantity": 1
      },
      {
          "id": "0f1e2d3c-4b5a-4c99-8d7e-6a5b4c3d2e55",
          "order_id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
          "product_id": "c1a9e7b3-4d2f-4f88-9e6a-1b3c5d7f2a66",
          "quantity": 2
      }
  ],
  "discountItems": [
      {
          "id": "d2e7a1c9-6b4f-4c55-8a3d-9f1e2b7c6d99",
          "order_id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
          "discount_id": "1b7d3e9a-2c4f-4e33-9c8a-7f2b1d6e4a11"
      },
      {
          "id": "8a3c1f2e-7d9b-4d44-b6a1-2e7c9f3a5b00",
          "order_id": "9c8b7a6d-5e4f-4d88-b3a2-1f0e9d8c7b66",
          "discount_id": "e3b1a7d9-5c2f-4a11-b9e3-6d7c2f1a8b33"
      }
  ]
}
```

**Fel:** `404 Not Found`

```json
{ "error": "Order not found" }
```

### POST /api/orders/

Skapar en ny beställning,

**Body:**

```json
{
  "user_id": "2a3b4c5d-6e7f-4e77-9a8b-1c2d3e4f5a77",
  "items": [
    {
      "product_id": "c1a9e7b3-4d2f-4f88-9e6a-1b3c5d7f2a66",
      "quantity": 2
    },
    {
      "product_id": "2f8a1d3c-5b7e-4e91-b2d6-8c3f1a9e7d55",
      "quantity": 1
    },
    {
      "product_id": "4c9a2f7d-1e3b-4b66-a9d2-5f7c3e1a8b88",
      "quantity": 1
    }
  ]
}
```

Alla fält är obligatoriska.

**Svar:** `201 Created`

```json
{
  "message": "Order skapad",
  "order_id": "189d68fc-0f5e-4cd9-956e-42ccf0ef319c",
  "total_price": 127,
  "total_before_discount": 182,
  "discount_amount": 55,
  "eta": 21,
  "discount_types": [
      {
          "id": "1b7d3e9a-2c4f-4e33-9c8a-7f2b1d6e4a11",
          "title": "Two Latte Discount",
          "amount": 20
      },
      {
          "id": "6f2a9c1d-3b7e-4f22-a5d9-8c1e3b7a2d22",
          "title": "Latte Combo Discount",
          "amount": 15
      },
      {
          "id": "e3b1a7d9-5c2f-4a11-b9e3-6d7c2f1a8b33",
          "title": "Bun and Coffee Combo Discount",
          "amount": 20
      }
  ],
  "all_items": [
      {
          "name": "Kaffe Latte",
          "price": 54,
          "quantity": 2
      },
      {
          "name": "Latte Macchiato",
          "price": 49,
          "quantity": 1
      },
      {
          "name": "Kanelbulle",
          "price": 25,
          "quantity": 1
      }
  ]
}
```

**Fel:**

Se middleware POST /api/orders

## Middleware

### API-nyckel requireApiKey.js

**Body:**

```json
{
  x-api-key: <din_nyckel>
}
```

**Fel:** 
`401 Unauthorized`

```json
{ "error": "Invalid API key" }
```

## validateUser.js

### GET /:id

Hämta specifik användare

**Fel:** 
`404 Internal Server Error`

```json
{ "error": "Kunde inte hämta denna användare" }
```

### POST

Skapa användare 

**Fel:** 
`400 Bad Request`

```json
{ "error": "Kunde inte skapa användare. Alla fält måste fyllas i." }
```

### PUT /:id

Uppdatera användare

**Fel:** 
`400 Bad Request`

```json
{ "error": "Kunde inte uppdatera användare. Något fält måste fyllas i." }
```

### POST /api/orders

Skapar en ny order och använder validateOrder middleware för att säkerställa att innehållet är korrekt och att produkterna finns i databasen.

**Fel:** 
`400 Bad Request`

```json
{ "error": "Request body saknas eller är i fel format" }

{ "error": "user_id måste vara en sträng om det skickas med" }

{ "error": "items måste finnas och vara en array" }

{ "error": "En order måste innehålla minst en produkt" }

{ "error": "Item på position ${i} måste vara ett objekt" }

{ "error": "product_id på position ${i} måste vara en sträng" }

{ "error": "quantity ${i} måste vara ett heltal större än 0" }

{ "error": "Produkt med id ${item.product_id} finns inte i menyn" }

{ "error": "Fel pris för produkt med id ${item.product_id}" }
```

**Fel:** 
`500 Internal Server Error`

```json
{ "error": "Något gick fel i valideringen" }
```
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
```
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
