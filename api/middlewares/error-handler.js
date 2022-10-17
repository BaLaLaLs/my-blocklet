const HttpResult = require("../libs/result");
const { ValidateError } = require("../errors");
/**
 * 统一错误处理中间件
 * @returns {(function(*, *, *, *): void)|*}
 */
module.exports = function() {
  return (err, req, res, next) => {
    if (err instanceof ValidateError && err.errors.length > 0) {
      return res.json(HttpResult.fail(err.errors[0].msg));
    } else if (typeof err === "string" || err instanceof String) {
      return res.json(HttpResult.fail(err));
    }
    res.json(HttpResult.fail(err.message));
  };
};
