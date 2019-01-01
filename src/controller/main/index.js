const express = require('express');
const path = require('path');

const router = express.Router();
const IsAuth = require('./../../auth/middleware')

//router.get('/',IsAuth,require('./main'));
router.get('/',require('./main'));

//Carregar arquivos node_modules
require('./style')(router,path);
require('./scripts')(router,path);


module.exports = router;