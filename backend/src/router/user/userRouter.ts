import { Router } from "express";
import { loginHandler } from "../../handlers/user/login/loginHandler";
import { refreshHandler } from "../../handlers/user/refresh/refreshHandler";
import { registerHandler } from "../../handlers/user/register/registerHandler";
import { deleteUserHandler } from "../../handlers/user/remove/deleteUserHandler";

const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/refresh", refreshHandler)

router.delete("/users", deleteUserHandler)

export const userRouter = router