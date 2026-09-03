import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create, getAll } from "./task.controller";

const router = Router();

router.use(authenticate);

router.post("/:columnId", create);
router.get("/:columnId", getAll);

export default router;