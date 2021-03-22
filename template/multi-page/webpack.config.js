const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");

function parseEntry() {
  let entries = {};
  let htmlPlugins = [];
  let isProd = process.env.npm_lifecycle_script.includes("production");
  let pageList = glob.sync("./src/pages/*/*.js");
  pageList.forEach((importPath) => {
    let paths = importPath.split("/");
    let chunk = paths[3];
    let config = require(`./src/pages/${chunk}/${chunk}.json`);
    if (isProd || config.hot) {
      entries[chunk] = importPath;
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          filename: chunk + ".html",
          chunks: [chunk],
          templateParameters: config,
          template: `./src/pages/${chunk}/${chunk}.ejs`,
        })
      );
    }
  });
  return {
    entries,
    htmlPlugins,
  };
}
let myconfig = parseEntry();
module.exports = {
  mode: "development",
  entry: myconfig.entries,
  devServer: {
    index: "home.html",
    contentBase: path.resolve(__dirname, "./dist"),
    // hot: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://11.50.49.23/api/stportal/concrete/',
        // target: 'http://11.50.49.23:9009/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    disableHostCheck: true,
  },
  resolve: {
    extensions: [".js", ".scss", ".ejs"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        loader: "ejs-loader",
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
    ...myconfig.htmlPlugins,
  ],
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
