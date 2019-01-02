const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const acl = require('express-acl')

const app = express();


/** PASSPORT BASIC */
/*passport.use(require('./src/auth/basic'))
app.get('*',passport.authenticate('basic',{session:false}))
*/

/** PASSPORT Local */
require('./src/auth/local')(passport)

//Configuiração do morgan
app.use(morgan('dev'));

//Configuiração do body Parser
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());  

app.use(methodOverride('_method'));
app.use(session({ secret: '!@#DJKALSHDJKA#@!#!@', resave: false, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'src/view'))

mongoose.connect('mongodb://localhost:27017/acl', { useNewUrlParser: true });
//mongoose.Promise = global.Promise;

acl.config({
    filename: '/src/acl.json',
    baseUrl: '/',
    denyCallback: (res) => {
        console.log(res)
        return res.status(403).json({
          status: 'Access Denied',
          success: false,
          message: 'You are not authorized to access this resource'
        });
    }
})

app.use(acl.authorize)
require('./src/index')(app, passport);

const PORT = 9000;
app.listen(PORT, ()=>{
    console.log('Express has been started at ${PORT}');
})