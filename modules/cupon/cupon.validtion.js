import Joi from "joi";


const addCuponVal=Joi.object({
    code:Joi.string().min(2).max(100).required().trim(),
    expires:Joi.date().required(),
    discount:Joi.number().min(0).required().options({convert:false})
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateCuponVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    code:Joi.string().min(2).max(100).trim(),
    expires:Joi.date(),
    discount:Joi.number().min(0).required().options({convert:false})

})

export{
    addCuponVal,
    paramsIdVal,
    updateCuponVal
}