
import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"
import { addAddressVal, paramsIdVal, updateAddressVal } from "./adress.validtion.js"
import { addAddress, getLoggedUserAddresses, removeAddress, updateAddress } from "./address.controller.js"
const addressRouter=express.Router()
addressRouter
.route("/address")
.post(protectedRoutes,allowUsers('user','admin'),validation(addAddressVal),addAddress)
.get(protectedRoutes,allowUsers('user','admin'),getLoggedUserAddresses)
addressRouter.route('/address/:id')
.put(protectedRoutes,allowUsers("user",'admin'),validation(updateAddressVal),updateAddress)
.delete(protectedRoutes,allowUsers("user",'admin'),validation(paramsIdVal),removeAddress)
export default addressRouter