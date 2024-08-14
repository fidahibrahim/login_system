const express = require('express');
const bodyparser = require('body-parser');
const session = require("express-session");
const {v4:uuidv4} = require("uuid");
const nocache = require('nocache');
const path = require('path');

const router = require('./router');

const app = express();

app.set('view engine', 'ejs'); //Initializing engine



//const port = process.env.PORT||8000;
const port = 8000;
app.use(nocache()); // Cache will be removed
app.use(bodyparser.json()) // to configure middleware for handling HTTP requests
app.use(bodyparser.urlencoded({extended:true})) // parse incoming request bodies with URL-encoded data.

app.use('/assets',express.static(path.join(__dirname,'/assets')));

app.use(session({
    secret:uuidv4(), //keep the session hidden
    resave:false,
    saveUninitialized: true
}));

app.use('/', router);

//Home Route
app.listen(port, () => {
    console.log("Server is running on http://localhost:8000");
})


