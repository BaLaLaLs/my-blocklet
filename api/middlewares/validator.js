/**
 * 参数验证中间件
 */
const { ValidateError } = require("../errors");
const { validationResult } = require("express-validator");
module.exports = function(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    throw new ValidateError("", errors.array());
  };
};
