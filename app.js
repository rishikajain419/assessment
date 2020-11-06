const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors")


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addBlogRouter = require('./routes/addBlog');
const viewBlogsRouter = require('./routes/viewBlogs')
const methodOverride  = require("method-override");

// importing API Routes 
const blogsRouter = require('./routes/api/blogs');

// configure swagger in app.js 
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Blog-App API',
      description: 'Blog-App API Documentation'
    },
    servers: ['http://localhost:8080']
  },
  apis: ['./routes/*/*.js', './routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST, DELETE"
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addBlog',addBlogRouter);
app.use('/viewBlogs',viewBlogsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// API Endpoints 
app.use('/api/blogs', blogsRouter);


// override with POST having ?_method=PUT
app.use(methodOverride('_method'))

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

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})

module.exports = app;
