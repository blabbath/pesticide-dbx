const webpack = require('webpack');
const config = require('./webpack.dev');
const compiler = webpack(config);

module.exports = app => {
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);

    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
};
