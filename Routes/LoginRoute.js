const express = require('express');
const { login } = require('../Controller/LoginRouteController');
const router = express.Router();

router.get('/',login)

module.exports = router;