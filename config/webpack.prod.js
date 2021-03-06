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
    base:
        process.platform !== 'win32'
            ? 'https://sf.julius-kuehn.de/pesticide-dbx/'
            : 'http://localhost:8000/',
    minify: false,
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
    devtool: 'source-map',

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
        //// DOWNLOADS ///
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'downloads.ejs',
                template: './views/downloads.ejs',
                chunks: ['downloads'],
            })
        ),
        //// LOGIN ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'login.ejs',
                template: './views/login.ejs',
                chunks: ['index'],
            })
        ),
        //// REGISTER ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'register.ejs',
                template: './views/register.ejs',
                chunks: ['index'],
            })
        ),
        //// SYNOPS ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'synops.ejs',
                template: './views/charts.ejs',
                chunks: ['synops'],
            })
        ),
        //// PLI ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'pli.ejs',
                template: './views/charts.ejs',
                chunks: ['pli'],
            })
        ),
        //// TLI ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'tli.ejs',
                template: './views/charts.ejs',
                chunks: ['tli'],
            })
        ),
        //// PRI ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'pri.ejs',
                template: './views/charts.ejs',
                chunks: ['pri'],
            })
        ),
        //// HRI ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'hri.ejs',
                template: './views/charts.ejs',
                chunks: ['hri'],
            })
        ),
        //// SALES ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'sales.ejs',
                template: './views/charts.ejs',
                chunks: ['sales'],
            })
        ),
        //// ADMIN ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'admin.ejs',
                template: './views/admin.ejs',
                chunks: ['admin'],
            })
        ),
        //// STATES ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'state.ejs',
                template: './views/state.ejs',
                chunks: ['state'],
            })
        ),
        //// COMPARE ////
        new HtmlWebPackPlugin(
            Object.assign(defaults, {
                filename: 'compare.ejs',
                template: './views/compare.ejs',
                chunks: ['compare'],
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
