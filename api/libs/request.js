const pickChainUrl = require("etherscan-api/lib/pick-chain-url");
const tunnel = require("tunnel");
const { setup } = require("axios-cache-adapter");
// 隧道 因为墙的原因在开发时启用
const tunnelingAgent = tunnel.httpsOverHttp({
  proxy: {
    host: process.env.TUNNEL_HOST,
    port: Number(process.env.TUNNEL_PORT)
  }
});
const axiosInstance = setup({
  baseURL: pickChainUrl(),
  timeout: 1000 * 10,
  httpsAgent: (process.env.ENABLE_TUNNEL === "true") ? tunnelingAgent : null,
  proxy: false,
  // 配置接口缓存
  cache: {
    maxAge: 5 * 1000,
    exclude: { query: false }
  }
});
module.exports = axiosInstance;
