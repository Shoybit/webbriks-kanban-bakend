import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create, getAll, update, remove } from "./task.controller";

const router = Router();

router.use(authenticate);

router.post("/:columnId", create);
router.get("/:columnId", getAll);
router.put("/:taskId", update);
router.delete("/:taskId", remove);

export default router;