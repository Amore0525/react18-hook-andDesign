const { override, fixBabelImports, addLessLoader, adjustStyleLoaders } = require("customize-cra");
// 使用ant-design搭建React+ts项目，可在此重重定义antd全局样式
const overConfig = override(
  // fixBabelImports("import", {
  //   libraryName: "antd",
  //   libraryDirectory: "es",
  //   style: true,
  // }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "green" },
    },
  }),
  // addLessLoader({
  //   javascriptEnabled: true,
  //   modifyVars: { "@primary-color": "#ff0000" },
  // }),
  // 网友`阖湖丶`的介绍，解决：ValidationError: Invalid options object. PostCSS Loader has been initialized...
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
);

module.exports = function (config, env) {
  return overConfig(config, env);
};
