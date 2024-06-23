
import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"
import { addCuponVal, paramsIdVal, updateCuponVal } from "./cupon.validtion.js"
import { addcoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "./cupon.controller.js"

const couponRouter=express.Router()
couponRouter.use(protectedRoutes,allowUsers('admin'))
couponRouter
.route("/coupons")
.post(validation(addCuponVal),addcoupon)
.get(getAllCoupons)
couponRouter.route('/coupons/:id')
.get(validation(paramsIdVal),getSingleCoupon)
.put(validation(updateCuponVal),updateCoupon)
.delete(validation(paramsIdVal),deleteCoupon)
export default couponRouter