import { globalError } from "../middleware/globalError.js"
import addressRouter from "./address/address.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandsRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./cupon/cupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishListRouter from "./wishlist/wishlist.routes.js"
export const bootstrap=(app)=>{
    app.use(categoryRouter)
    app.use(subcategoryRouter)
    app.use(brandsRouter)
    app.use(productRouter)
    app.use(userRouter)
    app.use(authRouter)
    app.use(reviewRouter)
    app.use(wishListRouter)
    app.use(addressRouter)
    app.use(couponRouter)
    app.use(cartRouter)
    app.use(orderRouter)
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use(globalError)

}