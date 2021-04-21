module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/var.scss";',
      },
    },
  },
  productionSourceMap: false,
  devServer: {
    host: 't.jd.com',
    port: 3050,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://proxy.jd.com/', // 内网host提供mock接口 11.50.49.23 proxy.jd.com
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '后台管理';
      return args;
    });
  },
};
