import { Router } from "express";
import { loginHandler } from "../../handlers/user/login/loginHandler";
import { refreshHandler } from "../../handlers/user/refresh/refreshHandler";
import { registerHandler } from "../../handlers/user/register/registerHandler";

const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/refresh", refreshHandler)

export const userRouter = router