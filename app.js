const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); 
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'secreto-monumentos-malaga',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } 
}));


app.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged || false;
    res.locals.user = req.session.user || null;
    next();
});

app.use('/', indexRouter);


app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { layout: false });
});

module.exports = app;