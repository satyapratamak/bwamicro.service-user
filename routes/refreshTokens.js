var express = require('express');
var router = express.Router();

var refreshTokensHandler = require('./handler/refresh-tokens');

router.post('/', refreshTokensHandler.create);
router.get('/', refreshTokensHandler.getToken);


module.exports = router;