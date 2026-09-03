import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create, getAll, getOne, update  } from "./board.controller";
const router = Router();

router.use(authenticate);

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", update);

export default router;