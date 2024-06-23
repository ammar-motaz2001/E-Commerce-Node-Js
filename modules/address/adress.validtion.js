import Joi from "joi";


const addAddressVal=Joi.object({
    street:Joi.string().min(2).required().trim(),
    phone:Joi.string().required(),
    city:Joi.string().min(2).required().trim()
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateAddressVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    street:Joi.string().min(2).trim(),
    phone:Joi.string(),
    city:Joi.string().min(2).trim()

})

export{
    addAddressVal,
    paramsIdVal,
    updateAddressVal
}