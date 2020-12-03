const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const defaults = {
    inject: 'body',
    minify: false,
    meta: {
        viewport: 'width=device-width, initial-scale=1',
        charset: 'utf-8',
    },
    /* baseUrl for dev */
    base: 'http://localhost:8000/',
};

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: 'dist',
        writeToDisk: true,
        overlay: true,
        hot: true,
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //// INDEX ////
        new HtmlWebPackPlugin({
            filename: 'headerIndex.ejs',
            template: './views/partials/headerIndex.ejs',
            chunks: [],
            minify: false,
        }),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'index.ejs',
                template: './views/index.ejs',
                chunks: ['index'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'login.ejs',
                template: './views/login.ejs',
                chunks: ['index'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'register.ejs',
                template: './views/register.ejs',
                chunks: ['index'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'downloads.ejs',
                template: './views/downloads.ejs',
                chunks: ['index'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'synops.ejs',
                template: './views/charts.ejs',
                chunks: ['synops'],
            })
        ),
    ],
});
