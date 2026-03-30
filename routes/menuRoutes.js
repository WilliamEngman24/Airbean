import { Router } from "express";
import db from "../data/db.js";

const router = Router();

// User Story 1
// GET http://localhost:3000/api/menu-Hämta hela menyn

router.get("/", (req, res) => {
  const menu = db.prepare("SELECT * FROM menu").all();

  if (!menu || menu.length === 0) {
    return res.status(404).json({ error: "Menyn hittades inte" });
  }

  res.json(menu);
});

// GET /api/menu/:id-Hämta en specifik kaffesort

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const coffee = db.prepare("SELECT * FROM menu WHERE id = ?").get(id);

  if (!coffee) {
    return res.status(404).json({ error: "Kaffesorten hittades inte" });
  }
  res.json(coffee);
});

export default router;
