const Joi = require("joi");

const addRegistrationDataJoi = (req, res, next) => {
  const joiSchema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required(),
    rePassword: Joi.ref("Password"),
  }).options({ abortEarly: false });

  const result = joiSchema.validate(req.body);

  if (result.error) {
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "The request contains invalid or malformed input data.",
    });
  } else {
    req.body = result.value;
    next();
  }
};

const loginJoi = (req,res,next)=>{
    const Joischema = Joi.object({
        Email: Joi.string().email().required(),
        Password: Joi.string().required(),
    })

    const result = Joischema.validate(req.body);

    if(result.error) {
        res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "The request contains invalid or malformed input data.",
          });
    }
    else{
        next();
    }
}

const addAdminJoi = (req,res,next)=>{
    const Joischema = Joi.object({
        Email: Joi.string().email().required(),
        Password: Joi.string().required(),
    })

    const result = Joischema.validate(req.body);

    if(result.error) {
        res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "The request contains invalid or malformed input data.",
          });
    }
    else{
        next();
    }
}



module.exports = {
  addRegistrationDataJoi,
  loginJoi,
  addAdminJoi
};
