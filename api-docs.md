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
