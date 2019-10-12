const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const webpack = require("webpack");

const PATHS = {
  src: path.resolve(process.cwd(), "src"),
  dist: path.resolve(process.cwd(), "dist")
};

const basicPlugins = [
  new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: `${PATHS.src}/index.html`,
    filename: "index.html",
    chunks: ["index", "common"]
  }),
  new HtmlWebpackPlugin({
    title: "О проекте",
    inject: false,
    hash: true,
    template: `${PATHS.src}/about.html`,
    filename: "about.html",
    chunks: ["about", "common"]
  }),
  new HtmlWebpackPlugin({
    title: "Аналитика",
    inject: false,
    hash: true,
    template: `${PATHS.src}/analytics.html`,
    filename: "analytics.html",
    chunks: ["analytics", "common"]
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].min.css"
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }),
  new WebpackMd5Hash()
];

const prodPlugins = [
  new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: `${PATHS.src}/index.html`,
    filename: "index.html",
    chunks: ["index", "common"]
  }),
  new HtmlWebpackPlugin({
    title: "О проекте",
    inject: false,
    hash: true,
    template: `${PATHS.src}/about.html`,
    filename: "about.html",
    chunks: ["about", "common"]
  }),
  new HtmlWebpackPlugin({
    title: "Аналитика",
    inject: false,
    hash: true,
    template: `${PATHS.src}/analytics.html`,
    filename: "analytics.html",
    chunks: ["analytics", "common"]
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].min.css"
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }),
  new WebpackMd5Hash()
];

module.exports = (env, options) => {
  const { mode } = options;

  return {
    entry: {
      index: [`${PATHS.src}/js/index`, `${PATHS.src}/index.css`],
      about: [`${PATHS.src}/js/about`, `${PATHS.src}/about.css`],
      analytics: [`${PATHS.src}/js/analytics`, `${PATHS.src}/analytics.css`],
      common: [`${PATHS.src}/js/common`]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename:
        mode !== "production"
          ? "js/[name].[chunkhash].js"
          : "js/[name].[chunkhash].min.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader"
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          use: [
            "file-loader?name=./images/[name].[ext]",
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 95
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: "file-loader?name=./vendor/[name].[ext]"
        }
      ]
    },
    optimization: {
      // splitChunks: {
      //     chunks: "all",
      //     minSize: 1,
      //     minChunks: 2
      // },
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: mode !== "production" ? basicPlugins : prodPlugins
    // plugins: mode !== 'production' ? basicPlugins : basicPlugins.concat(prodPlugins)
  };
};

// "build": "NODE_ENV=production rimraf dist && webpack --mode production --progress",
// "dev": "NODE_ENV=development webpack-dev-server --mode development --open --watch",
