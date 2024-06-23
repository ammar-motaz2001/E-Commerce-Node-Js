
import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"
import { addReviewVal, paramsIdVal, updateReviewVal } from "./review.validtion.js"
import { addreview, deleteReview, getAllreviews, getSinglereview, updateReview } from "./review.controller.js"

const reviewRouter=express.Router()
reviewRouter
.route("/reviews")
.post(protectedRoutes,allowUsers('user','admin'),validation(addReviewVal),addreview)
.get(getAllreviews)
reviewRouter.route('/reviews/:id')
.get(validation(paramsIdVal),getSinglereview)
.put(protectedRoutes,allowUsers("user",'admin'),validation(updateReviewVal),updateReview)
.delete(protectedRoutes,allowUsers("user",'admin'),validation(paramsIdVal),deleteReview)
export default reviewRouter