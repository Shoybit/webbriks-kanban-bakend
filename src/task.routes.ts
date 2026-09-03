import { Router } from "express";
import { authenticate } from "./auth.middleware";
import { create } from "./task.controller";

const router = Router();

router.use(authenticate);

router.post("/:columnId", create);

export default router;