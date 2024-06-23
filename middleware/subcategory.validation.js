import Joi from "joi";


const addsubCategoryVal=Joi.object({
    name:Joi.string().min(2).max(100).required().trim(),
    category:Joi.string().hex().length(24).required()
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updatesubCategory=Joi.object({
    name:Joi.string().min(2).max(100).trim(),
    id:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24).required()

})

export{
    addsubCategoryVal,
    paramsIdVal,
    updatesubCategory
}