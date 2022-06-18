var express = require('express');
var router = express.Router();
var userHandler = require('./handler/users');

/* GET users listing. */
router.post('/register', userHandler.register);



module.exports = router;
