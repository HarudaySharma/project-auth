import express from "express";
import { sign_up, sign_in, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/sign_up', sign_up);
router.post('/sign_in', sign_in);
router.post('/google', google);

export default router;