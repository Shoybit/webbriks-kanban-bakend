import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create, getAll, getOne } from "./board.controller";
const router = Router();

router.use(authenticate);

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);

export default router;