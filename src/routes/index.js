import express from "express";
const router = express.Router();

import { accountController } from "../controllers";


router.get("/api/account", accountController.get);



export default router;