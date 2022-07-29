const joi = require('joi');

 const joiTodosSchema = joi.object({
  nickname: joi.string().min(4).max(100),
  real_name: joi.string().min(4).max(100),
  origin_description: joi.string().min(4).max(200),
  superpowers: joi.string().min(4).max(100),
  catch_phrase: joi.string().min(4).max(100),
});


     function joiTodoValidation( req, res,next) {
    const { error } = joiTodosSchema.validate(req.body);
      if (error) {
        return res.status(401).json(error);
      } else {
        next();
      }
    }
    module.exports = joiTodoValidation