
const Joi = require("joi");
const signup_hostSchemma=Joi.object({
    name:Joi.string().required(),
    college:Joi.string().required(),
    phone:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()

})
const signup_userSchemma=Joi.object({
    name:Joi.string().required(),
    college:Joi.string().required(),
    branch:Joi.string().required(),
    year:Joi.string().required(),
     rollno:Joi.string().required(),
    phone:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()

});
const eventSchema=Joi.object({
    name:Joi.string().required(),
    image:Joi.object({
        url:Joi.string().required(),
        filename:Joi.string().required(),
    }).required(),
    price:Joi.number().required(),
    prize:[
        Joi.number().required,
        Joi.number().required,
        
    ]

})
module.exports=signup_hostSchemma;
module.exports=signup_userSchemma;
module.exports=eventSchema;
