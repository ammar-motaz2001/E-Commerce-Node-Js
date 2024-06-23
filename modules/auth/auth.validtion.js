import Joi from 'joi'


const signupVal=Joi.object({
    name:Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword:Joi.valid(Joi.ref("password")).required(),
})


const signinVal=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
})

const changePasswordVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    newPassword:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),

})

export{
    signupVal,
    signinVal,
    changePasswordVal
}