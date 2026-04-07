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


---

### POST /api/orders

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