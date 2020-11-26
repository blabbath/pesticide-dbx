const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    config = require('config'),
    cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

/* Add webpack HMR */
if (process.env.NODE_ENV !== 'production') {
    require('./config/webpackHotMiddleware')(app);
}

app.set('view engine', 'ejs');
const staticMiddleware = express.static('dist');

const projects = require('./config/projects');

projects.forEach(p => {
    let route = new (require(`./routes/${p.name}.js`))(
        `../dist`
    );

    route.setRoutes();

    app.use(`${p.route}`, route.getRoutes());
    app.use(staticMiddleware);

    app.use(`/${p.route}`, express.static(`./public`));
});

app.listen(8000, () => console.log('http://http://localhost:8000/'));
