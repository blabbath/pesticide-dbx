const webpack = require('webpack');

module.exports = {
    entry: {
        index: './public/javascripts/index.js',
        downloads: './public/javascripts/downloads.js',
        synops: './public/javascripts/synops.js',
        pli: './public/javascripts/pli.js',
        tli: './public/javascripts/tli.js',
        pri: './public/javascripts/pri.js',
        hri: './public/javascripts/hri.js',
        sales: './public/javascripts/sales.js',
        state: './public/javascripts/state.js'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.ejs$/,
                use: ['raw-loader'],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'imgs',
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
};
