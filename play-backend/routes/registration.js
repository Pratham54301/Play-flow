import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { createRegistration, listRegistrations } from "../controllers/registrationController.js";
import { upload } from "../config/upload.js";

const router = Router();

router.get("/", authenticateToken, listRegistrations);
router.post("/", authenticateToken, upload.single("screenshot"), createRegistration);

export default router;