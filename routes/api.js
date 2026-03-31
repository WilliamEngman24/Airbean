import { Router } from "express";
import { requireApiKey } from "../middleware/requireApiKey.js";
import userRoutes from "./userRoutes.js";
import menuRoutes from "./menuRoutes.js";
import orderRoutes from "./orderRoutes.js";

/*import express from 'express';
import { validateOrder } from '../middleware/validateOrder.js';*/

const router = Router ();

router.use(requireApiKey);
router.use("/users", userRoutes);
router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);

/*router.post('/test-order', validateOrder, (req, res) => {
  res.status(200).json({
    message: 'Validering OK',
    items: req.validatedItems
  });
});*/

export default router;
