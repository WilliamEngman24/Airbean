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
---

### GET /api/menu/:id

Hämtar ett specifikt meny id-nr

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

### PATCH /api/users/:id

Uppdaterar användarinformation. Både username och email kan ändras separat eller på samma gång.

**Sparad användare**

```json
{
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
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
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
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
    "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
    "user_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
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
  "order_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
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
  "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
  "user_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
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
      "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
      "user_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
      "total_price": 93,
      "ETA": 17,
      "order_date": "2026-04-02T08:30:04.699Z"
  },
  "items": [
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfp",
          "order_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
          "product_id": "7",
          "quantity": 1
      },
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67bbfl",
          "order_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
          "product_id": "5",
          "quantity": 2
      }
  ],
  "discountItems": [
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67xyz1",
          "order_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
          "discount_id": "95205af1-646b-45f6-8bed-bcd0ee67adc1"
      },
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67xyz2",
          "order_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfh",
          "discount_id": "95205af1-646b-45f6-8bed-bcd0ee67adc3"
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
  "user_id": "95205af1-646b-45f6-8bed-bcd0ee67bbfb",
  "items": [
    {
      "product_id": "5",
      "quantity": 2
    },
    {
      "product_id": "4",
      "quantity": 1
    },
    {
      "product_id": "7",
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
  "order_id": "9d27fa5e-d34a-45f0-b599-21953055eff4",
  "total_price": 127,
  "total_before_discount": 182,
  "discount_amount": 55,
  "eta": 21,
  "discount_types": [
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67adc1",
          "title": "Two Latte Discount",
          "amount": 20
      },
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67adc2",
          "title": "Latte Combo Discount",
          "amount": 15
      },
      {
          "id": "95205af1-646b-45f6-8bed-bcd0ee67adc3",
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












