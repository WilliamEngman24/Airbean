import { Router } from "express";
import db from "../data/db.js";

const router = Router();

// GET http://localhost:3000/api/menu-Hämta hela menyn
router.get("/", (req, res) => {
  try {
    const menu = db.prepare("SELECT * FROM menu").all();

    if (!menu || menu.length === 0) {
      return res.status(404).json({ error: "Kaffemenyn hittades inte" });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Ett oväntat fel uppstod" });
  }
});

// GET /api/menu/:id-Hämta en specifik kaffesort
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const coffee = db.prepare("SELECT * FROM menu WHERE id = ?").get(id);

    if (!coffee) {
      return res.status(404).json({ error: "Kaffesorten hittades inte" });
    }
    res.json(coffee);
  } catch (error) {
    res.status(500).json({ error: "Ett oväntat fel uppstod" });
  }
});

export default router;