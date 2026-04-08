import { Router } from "express";
import { requireApiKey } from "../middleware/requireApiKey.js";

import userRoutes from "./userRoutes.js";
import menuRoutes from "./menuRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = Router();

router.use(requireApiKey);

router.use("/users", userRoutes);
router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);

export default router;
