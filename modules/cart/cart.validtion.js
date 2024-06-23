import Joi from "joi";


const addToCartVal=Joi.object({
    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().options({convert:false}),
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateCartVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().required().options({convert:false})

})

export{
    addToCartVal,
    paramsIdVal,
    updateCartVal
}