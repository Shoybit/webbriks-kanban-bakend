import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create, getAll, update } from "./column.controller";

const router = Router();

router.use(authenticate);

router.post("/:boardId", create);
router.get("/:boardId", getAll);
router.put("/:columnId", update);

export default router;