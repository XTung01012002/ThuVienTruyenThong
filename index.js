var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
var cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 20231


var app = express();
// app.use(cors(corsOptions))
global.__baseName = __dirname
app.use(cors());
app.use(compression());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./src/dbs/init.mongodb");


var indexRouter = require("./src/routes/index");
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    console.log(err)
    return res.status(status).json({
        status: status,
        code: status,
        // stack:error.stack,
        message: err.message || "Internal Server Error",
    });
});

app.listen(port, () => {
    console.log('API Thu Vien So Truyen Thong Server Port 20231');
})

module.exports = app;
process.title = "API Thu Vien So Truyen Thong Server Port 20231";