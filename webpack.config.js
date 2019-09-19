const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const basicPlugins = [
    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        title: 'О проекте',
        inject: false,
        hash: true,
        template: 'src/about.html',
        filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
        title: 'Аналитика',
        inject: false,
        hash: true,
        template: 'src/analitics.html',
        filename: 'analitics.html'
    }),
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
    }),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackMd5Hash()
];

const prodPlugins = [
    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
        title: 'Custom template',
        inject: false,
        hash: true,
        template: 'src/about.html',
        filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
        title: 'Аналитика',
        inject: false,
        hash: true,
        template: 'src/analitics.html',
        filename: 'analitics.html'
    }),
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].min.css'
    }),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackMd5Hash()
];

module.exports = (env, options) => {
    let {mode} = options;

    return {
        entry: {
            main: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: mode !== 'production' ? '[name].[chunkhash].js' : '[name].[chunkhash].min.js'
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(png|jpg|gif|ico|svg)$/,
                    use: [
                        'file-loader?name=./images/[name].[ext]',
                        {
                            loader: 'image-webpack-loader',
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
                    loader: 'file-loader?name=./vendor/[name].[ext]'
                }
            ]
        },
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        plugins: mode !== 'production' ? basicPlugins : prodPlugins
        // plugins: mode !== 'production' ? basicPlugins : basicPlugins.concat(prodPlugins)
    }
};