console.log(process.env.NODE_ENV);
const express = require('express'),
    app = express(),
    config = require('config');
const bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'); /* ,
    morgan = require('morgan');
const winston = require('./config/winston'); */
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

/* Set log stream on morgan */
/* app.use(morgan('tiny', { stream: winston.stream }));
 */
/* Set app.locals */
app.locals = require('./config/locals');

/* Add webpack HMR */
if (process.env.NODE_ENV !== 'production') {
    require('./config/webpackHotMiddleware')(app);
}
/* Add connection to MongoDB */
mongoose = require('./config/db');

/* Add passport */
require('./config/passport')(app, passport);

/* Define view engine and routes */
app.set('view engine', 'ejs');
const staticMiddleware = express.static('dist');

const routes = require('./config/routes');

routes.forEach(r => {
    let route = new (require(`./routes/${r.name}.js`))(`../dist`);

    route.setRoutes();

    app.use(`${r.route}`, route.getRoutes());
    app.use(staticMiddleware);

    app.use(`/${r.route}`, express.static(`./public`));
});

/* app.use(function (err, req, res, next) {
    // error level logging
    winston.error(winston.combinedFormat(err, req, res));
    res.status(err.status || 500).send('Internal server error.');
}); */

const port = config.get(`${process.env.NODE_ENV}.appConfig.port`);

app.listen(port, () => console.log(`Running on ${port}`));
