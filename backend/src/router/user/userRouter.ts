import { Router } from "express";
import { loginHandler } from "../../handlers/user/login/loginHandler";
import { registerHandler } from "../../handlers/user/register/registerHandler";

const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)

export const userRouter = router