const path = require("path");
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      "@": path.resolve(__dirname, "src"),
    },
  },
  //配置代理解决跨域
  devServer: {
    proxy: {
      [process.env.REACT_APP_MARK]: {
        target: process.env.REACT_APP_API,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.REACT_APP_MARK}`]: "",
        },
      },
    },
  },
  // build打包文件名称更改
  // webpack: {
  //   // 更改build打包文件名称为dist
  //   configure: (webpackConfig, { env, paths }) => {
  //     webpackConfig.output.path = path.resolve(__dirname, "dist");
  //     paths.appBuild = path.resolve(__dirname, "dist");
  //     return webpackConfig;
  //   },
  // },
};
