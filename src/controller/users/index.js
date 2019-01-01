const express = require('express');
const router = express.Router();
const IsAuth = require('./../../auth/middleware')

module.exports = (passport) =>{

    router.get('/',IsAuth, require('./all'));
    router.post('/', IsAuth,passport.authenticate(('local-signup'),{
        successRedirect: '/users',
        failureRedirect: '/users',
    }))
    //router.post('/', require('./create'));
    router.get('/new',IsAuth, require('./new'));
    router.delete('/:id',IsAuth, require('./remove'));

    return router;
}

