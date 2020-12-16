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
    base: 'https://sf.julius-kuehn.de/pesticide-dbx/',
    minify: false
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
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'pli.ejs',
                template: './views/charts.ejs',
                chunks: ['pli'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'tli.ejs',
                template: './views/charts.ejs',
                chunks: ['tli'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'pri.ejs',
                template: './views/charts.ejs',
                chunks: ['pri'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'hri.ejs',
                template: './views/charts.ejs',
                chunks: ['hri'],
            })
        ),
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'sales.ejs',
                template: './views/charts.ejs',
                chunks: ['sales'],
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
