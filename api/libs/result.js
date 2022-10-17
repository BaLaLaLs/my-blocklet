/**
 * 业务统一返回类
 */
module.exports = class HttpResult {
  /**
   * 请求状态
   */
  code;
  /**
   * 返回消息
   */
  message;
  /**
   * 返回数据
   */
  result;

  constructor(code, message, result) {
    this.code = code;
    this.message = message;
    this.result = result;
  }

  static success(result) {
    return new HttpResult(200, "OK", result);
  }

  static fail(message) {
    return new HttpResult(500, message, null);
  }
};
