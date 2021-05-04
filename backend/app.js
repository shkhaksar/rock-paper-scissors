const createError = require('http-errors');
const express = require('express');
const Redis = require("ioredis");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

const app = express();

//setup CORS
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/', indexRouter);
app.use('/api/users/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err)

    if (typeof err === 'string') {
        // custom application error
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({message: err});
    } else if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({message: 'Unauthorized'});
    } else {
        return res.status(500).json({message: err.message});
    }
});


module.exports = app;
