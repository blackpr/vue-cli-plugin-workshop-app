const loadFiles = require("./load-files");
const webpack = require("webpack");

const workshopFiles = loadFiles();

module.exports = (api) => {
  api.chainWebpack(config => {
    config.module
      .rule("html")
      .test(/(exercise|final).*\.html$/)
      .use("html-loader")
      .loader("html-loader")
      .end();

    config.module
      .rule("md")
      .test(/\.md$/)
      .use("html")
      .loader("html-loader")
      .end()
      .use("markdown")
      .loader("markdown-loader")
      .end();
  }),
  
  api.chainWebpack((config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['WORKSHOP_FILES'] = JSON.stringify(workshopFiles);
      return definitions;
    });
  })
  

  // api.configureWebpack(() => {
  //   return {
  //     plugins: [
  //       new webpack.DefinePlugin({
  //         WORKSHOP_FILES: JSON.stringify(workshopFiles)
  //       })
  //     ]
  //   };
  // })
}
