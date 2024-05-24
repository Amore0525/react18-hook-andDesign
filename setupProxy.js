const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app
    .use
    // 不放这里，统一craco管理了
    // 将原来的 proxy 改为 createProxyMiddleware
    // createProxyMiddleware(process.env.REACT_APP_MARK, {
    //   target: process.env.REACT_APP_API,
    //   secure: false,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     [`^${process.env.REACT_APP_MARK}`]: "",
    //   },
    // })
    ();
};
