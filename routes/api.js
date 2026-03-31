import { Router } from "express";
import { requireApiKey } from "../middleware/requireApiKey.js";
import userRoutes from "./userRoutes.js";
/*import express from 'express';
import { validateOrder } from '../middleware/validateOrder.js';*/


// remove '//' when files for these routes are created
import menuRoutes from "./menuRoutes.js";
//import orderRoutes from "./orderRoutes.js";

const router = Router ();

/*router.post('/test-order', validateOrder, (req, res) => {
  res.status(200).json({
    message: 'Validering OK',
    items: req.validatedItems
  });
});*/

router.use(requireApiKey);
//router.use("/users", userRoutes);
router.use("/menu", menuRoutes);

// get rid of the '//' when file for orderRoutes.js iscreated
//router.use("/orders", orderRoutes);


export default router;
