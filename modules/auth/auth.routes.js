
import express from "express"
import { changePassword, signin, signup } from "./auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { changePasswordVal, signinVal, signupVal } from "./auth.validtion.js"

let authRouter=express.Router()

authRouter.post('/signup',validation(signupVal),signup)
authRouter.post('/signin',validation(signinVal),signin)
authRouter.patch('/changepassword/:id',validation(changePasswordVal),changePassword)


export default authRouter
