const express =  require('express'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');


const { database } = require('./keys'); /// con las llaves solo devolvemos una parte del objeto
mongoose.Promise = global.Promise;
mongoose.connect(database.URI, {
    useNewUrlParser : true /// esto es una función interna de Mongoose
    })
    .then(db => console.log('Conectado'))
    .catch(err => console.error(err));

const users = require('./routes/users');

const app = express();
// middlewares
app.use(logger('dev'));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/users', users);

// catch 404 error and forward them to error handler
app.use((req, res, next) => {
    const err =  new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler function

app.use((err, req, res, next) =>{

    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    console.error(err);
});

// start the server

const port = app.get('port') || 3000;
app.listen(port, () =>console.log('Server'));