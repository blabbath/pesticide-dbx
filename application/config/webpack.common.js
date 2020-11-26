const webpack = require('webpack');

module.exports = {
    entry: {
        index: './public/javascripts/index.js',
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
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
    ],
};
