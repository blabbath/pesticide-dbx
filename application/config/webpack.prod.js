const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const defaults = {
    inject: 'body', // injects javascript in body
    meta: {
        viewport: 'width=device-width, initial-scale=1',
        charset: 'utf-8',
    },
    base: 'https://www.yourURL.goesHere/',
};

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].js',
        path: path.join(__dirname, '../dist'),
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'indexA.ejs',
                template: './projects/projectsA/views/index.ejs',
                chunks: ['indexA'],
            })
        ),
    ],

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.css', '.scss'],
    },
    
});
