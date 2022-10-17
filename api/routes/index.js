const middleware = require("@blocklet/sdk/lib/middlewares");
const router = require("express").Router();
const { query } = require("express-validator");
const validator = require("../middlewares/validator");
const HttpResult = require("../libs/result");

router.use("/user", middleware.user(), (req, res) => res.json(req.user || {}));

router.get("/txs", validator([
    query("a").isString().trim().withMessage("请输入正确的hash地址"),
    query("page").isNumeric().optional().withMessage("请输入正确的页码"),
    query("offset").isNumeric().optional(),
    query("sort").isString().isIn(["asc", "desc"]).optional().withMessage("sort 只支持asc和desc")
  ])
  , async (req, res) => {
    const { etherscanApi } = req.app.locals;
    const { a: address, page, offset, sort } = req.query;
    const { message, result } = await etherscanApi.account.txlist(address, 0, "latest", page, offset, sort);
    if (message !== "OK") throw new Error(message);
    res.json(HttpResult.success(result));
  });

module.exports = router;
