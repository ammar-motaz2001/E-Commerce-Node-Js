import Joi from "joi";


const addUserVal=Joi.object({
    name:Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword:Joi.valid(Joi.ref("password")).required(),
})

const paramsIdVal=Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateUserVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(20),
    email:Joi.string().email(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword:Joi.valid(Joi.ref("password")),

})

export{
    addUserVal,
    paramsIdVal,
    updateUserVal
}