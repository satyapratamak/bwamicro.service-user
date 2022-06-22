var express = require('express');
var router = express.Router();
var userHandler = require('./handler/users');

/* GET users listing. */
router.post('/register', userHandler.register);

router.post('/login', userHandler.login);

router.put('/:id', userHandler.update);



module.exports = router;
