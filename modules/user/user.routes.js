
import express from "express"
import { validation } from "../../middleware/validation.js"
import { addUserVal, paramsIdVal, updateUserVal } from "../../middleware/user.validation.js"
import { adduser, deleteuser, getAllusers, getSingleuser, updateuser } from "./user.controller.js"
import { checkEmailExist } from "../../middleware/checkEmailExist.js"
const userRouter=express.Router()
userRouter
.route("/users")
.post(validation(addUserVal),checkEmailExist,adduser)
.get(getAllusers)
userRouter.route('/users/:id')
.get(validation(paramsIdVal),getSingleuser)
.put(validation(updateUserVal),updateuser)
.delete(validation(paramsIdVal),deleteuser)
export default userRouter