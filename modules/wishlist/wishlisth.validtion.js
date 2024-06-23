import Joi from "joi";


const addWishListVal=Joi.object({
    product:Joi.string().hex().length(24).required(),
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateWishListVal=Joi.object({
    product:Joi.string().hex().length(24),
})

export{
    addWishListVal,
    paramsIdVal,
    updateWishListVal
}