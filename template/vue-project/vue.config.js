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
    host: '{{host}}',
    port: 3001,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: '{{proxy}}',
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
