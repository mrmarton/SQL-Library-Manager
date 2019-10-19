var express = require('express');
var app = express();
var path= require('path');
var bodyParser= require('body-parser');

//importing sequelize
var sequelize = require("./models").sequelize;

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//setting pug for view engine + static route
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

// Get Book Routes 
const routes = require('./routes/');
const books = require('./routes/books');
app.use('/', routes);
app.use('/books', books);

//Handling errors 
app.use((req, res, next) => {
    const err = new Error('AW! Page is not found.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err + '')
    res.render('page-not-found');
})

sequelize.sync().then(function() {
app.listen(3000, () => {
    console.log("This great SQL APP is running on localhost:3000!");
    })
})