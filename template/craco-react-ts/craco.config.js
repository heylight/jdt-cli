const CracoLessPlugin = require("craco-less");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    host: "t.jdcloud.com",
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              "primary-color": "#4762fe",
            },
          },
        },
      },
    },
  ],
  eslint: {
    enable: true,
  },
  typescript: {
    enableTypeChecking: true,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE
        ? "server"
        : "json";

      const assignConfig = {
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ["console.log", "console.info", "console.warn"],
                },
                format: {
                  comments: false,
                },
              },
              extractComments: false,
            }),
            new CssMinimizerPlugin(),
          ],
        },
      };
      const mergeConfig = {
        plugins: [new BundleAnalyzerPlugin({ analyzerMode })],
      };
      const config = merge(
        Object.assign(webpackConfig, assignConfig),
        mergeConfig
      );
      return process.env.NODE_ENV === "production" ? config : webpackConfig;
    },
  },
};
