const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const defaults = {
    inject: 'body',
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
                use: ['style-loader', 'css-loader']
            }
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
            inject: 'body',
            filename: 'index.ejs',
            template: './views/index.ejs',
            chunks: ['index'],
            minify: false,
        }),
    ],
});
