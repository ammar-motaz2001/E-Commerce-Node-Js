import Joi from "joi";


const addCategoryVal=Joi.object({
    name:Joi.string().min(2).max(100).required().trim(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
    }).required()
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateCategory=Joi.object({
    name:Joi.string().min(2).max(100).required().trim(),
    id:Joi.string().hex().length(24).required()

})

export{
    addCategoryVal,
    paramsIdVal,
    updateCategory
}