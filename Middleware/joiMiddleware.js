const Joi = require("joi");

const validateUser = (user) => {
  const joiSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
  }).options({ abortEarly: false });

  return joiSchema.validate(user);
};

const user = {
  Email: "yash",
  Password:"1234"
};

response = validateUser(user);

if(response.error) 
{   
    console.log(response.error.details) 
} 
else
{ 
    console.log("Validated Data") 
}
