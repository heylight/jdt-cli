const Timestamp = new Date().getTime();

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/var.scss";',
      },
    },
  },
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`,
    },
  },
  productionSourceMap: false,
  devServer: {
    host: '{{host}}',
    port: 8020,
    proxy: {
      "/api": {
        target: 'http://{{proxy}}/',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "后台管理";
      return args;
    });
  },
};
