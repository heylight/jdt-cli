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
    host: "{{host}}",
    port: 8020,
    proxy: {
      "/api": {
        target: "{{proxy}}",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "智能中台";
      return args;
    });
  },
};
