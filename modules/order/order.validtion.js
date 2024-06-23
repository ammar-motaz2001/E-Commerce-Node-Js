import Joi from "joi";


const addOrderVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    shippingAddress:Joi.object({
        street:Joi.string().required().min(3).max(10),
        phone:Joi.string().required().max(11),
        city:Joi.string().required().min(3).max(10)
    }),

})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateCartVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().required().options({convert:false})

})

export{
   addOrderVal,
    paramsIdVal,
    updateCartVal
}