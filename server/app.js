const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const s3Router = require('./routes/s3');

const app = express();
const fs = require('fs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/s3', s3Router);

app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  uploadFile.mv(`${__dirname}/public/files/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(
      JSON.parse(
        fs.readFileSync(`${__dirname}/public/files/${fileName}`, 'utf8')
      )
    );
  });
});

module.exports = app;
