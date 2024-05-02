// const Joi = require("joi");
import Joi from "joi"

export const addRegistrationDataJoi = (req, res, next) => {
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

export const loginJoi = (req, res, next) => {
  const Joischema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required(),
  });

  const result = Joischema.validate(req.body);

  if (result.error) {
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "The request contains invalid or malformed input data.",
    });
  } else {
    next();
  }
};

export const addAdminJoi = (req, res, next) => {
  const Joischema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required(),
    rePassword: Joi.ref("Password"),
  });

  const result = Joischema.validate(req.body);

  if (result.error) {
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "The request contains invalid or malformed input data.",
    });
  } else {
    next();
  }
};

export const editFamilyDataJoi = (req,res,next)=>{
  const joiSchema = Joi.object({
    FathersName: Joi.string(),
    FathersAge: Joi.number(),
    FathersCountry:Joi.string(),
    MothersName:Joi.string(),
    mothersAge:Joi.number(),
    motherCountry:Joi.string(),
    diabetic:Joi.bool(),
    preDiabetic:Joi.bool(),
    CardiacPast:Joi.bool(),
    cardiacPresent:Joi.bool(),
    bloodPressure:Joi.bool()
  });

  const result = joiSchema.validate(req.body);

  if(result.error){
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

export const addFamilyDataJoi = (req,res,next)=>{
  const joiSchema = Joi.object({
    FathersName: Joi.string().required(),
    FathersAge: Joi.number().required(),
    FathersCountry:Joi.string().required(),
    MothersName:Joi.string().required(),
    mothersAge:Joi.number().required(),
    motherCountry:Joi.string().required(),
    diabetic:Joi.bool().required(),
    preDiabetic:Joi.bool().required(),
    CardiacPast:Joi.bool().required(),
    cardiacPresent:Joi.bool().required(),
    bloodPressure:Joi.bool().required()
  });

  const result = joiSchema.validate(req.body);

  if(result.error){
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

// module.exports = {
//   addRegistrationDataJoi,
//   loginJoi,
//   addAdminJoi,
//   editFamilyDataJoi,
//   addFamilyDataJoi
// };
