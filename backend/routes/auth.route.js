import express from "express";
import { sign_up, sign_in, sign_out, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/sign_up', sign_up);
router.post('/sign_in', sign_in);
router.post('/google', google);
router.get('/sign_out', sign_out);
export default router;