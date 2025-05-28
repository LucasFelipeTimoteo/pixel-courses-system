import { Router } from "express";
import { registerHandler } from "../../handlers/user/register/registerHandler";

const router = Router()

router.post("/register", registerHandler)

export const userRouter = router