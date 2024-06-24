
import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"
import { addOrderVal } from "./order.validtion.js"
import { addCashOrder, createCheckOutSession, createOnlineOrder, getAllOrder, getSpecificOrder } from "./order.controller.js"

const orderRouter=express.Router()
orderRouter
.route("/order")
// .post(protectedRoutes,allowUsers('user','admin'),validation(addToCartVal),addToCart)
.get(protectedRoutes,allowUsers('user','admin'),getSpecificOrder)

orderRouter.get("/order/all",protectedRoutes,allowUsers('admin'),getAllOrder)
// .delete(protectedRoutes,allowUsers('user','admin'),clearCart)

// cartRouter.post("/cart/applycupon",protectedRoutes,allowUsers('user','admin'),applyCupon)
orderRouter.post('/webhook', express.raw({type: 'application/json'}),createOnlineOrder)
orderRouter.route('/order/:id')
// .get(validation(paramsIdVal),getSinglereview)
.post(protectedRoutes,allowUsers("user",'admin'),validation(addOrderVal),addCashOrder)

orderRouter.post('/order/checkout/:id',protectedRoutes,allowUsers('user','admin'),createCheckOutSession)
export default orderRouter