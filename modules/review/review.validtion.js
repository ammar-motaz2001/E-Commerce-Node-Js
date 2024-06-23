import Joi from "joi";


const addReviewVal=Joi.object({
    text:Joi.string().min(2).max(100).required().trim(),
    product:Joi.string().hex().length(24).required(),
    rate:Joi.number().min(0).max(5).required()
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateReviewVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    text:Joi.string().min(2).max(100).trim(),
    product:Joi.string().hex().length(24),
    rate:Joi.number().min(0).max(5)

})

export{
    addReviewVal,
    paramsIdVal,
    updateReviewVal
}