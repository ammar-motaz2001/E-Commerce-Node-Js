
import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"
import { addToCartVal, paramsIdVal, updateCartVal } from "./cart.validtion.js"
import { addToCart, applyCupon, clearCart, deleteFromCart, getLoggedUserCart, updateQuantityInCart } from "./cart.controller.js"

const cartRouter=express.Router()
cartRouter
.route("/cart")
.post(protectedRoutes,allowUsers('user','admin'),validation(addToCartVal),addToCart)
.get(protectedRoutes,allowUsers('user','admin'),getLoggedUserCart)
.delete(protectedRoutes,allowUsers('user','admin'),clearCart)

cartRouter.post("/cart/applycupon",protectedRoutes,allowUsers('user','admin'),applyCupon)

cartRouter.route('/cart/:id')
// .get(validation(paramsIdVal),getSinglereview)
.put(protectedRoutes,allowUsers("user",'admin'),validation(updateCartVal),updateQuantityInCart)
.delete(protectedRoutes,allowUsers("user",'admin'),validation(paramsIdVal),deleteFromCart)
export default cartRouter