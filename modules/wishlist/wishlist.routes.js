
import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"
import { addWishListVal, paramsIdVal } from "./wishlisth.validtion.js"
import { addToWishList, getLoggedUserWishList, removeFromWishList } from "./wishlist.controller.js"

const wishListRouter=express.Router()
wishListRouter
.route("/wishlist")
.patch(protectedRoutes,allowUsers('user','admin'),validation(addWishListVal),addToWishList).get(protectedRoutes,allowUsers('user','admin'),getLoggedUserWishList)

wishListRouter.route('/wishlist/:id')
// .get(validation(paramsIdVal),getSinglereview)
// .put(protectedRoutes,allowUsers("user",'admin'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowUsers("user",'admin'),validation(paramsIdVal),removeFromWishList)
export default wishListRouter