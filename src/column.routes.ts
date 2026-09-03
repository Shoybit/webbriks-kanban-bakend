import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create, getAll } from "./column.controller";
const router = Router();

router.use(authenticate);

router.post("/:boardId", create);
router.get("/:boardId", getAll);

export default router;