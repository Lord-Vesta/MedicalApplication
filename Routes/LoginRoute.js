const express = require('express');
const { login } = require('../Controller/LoginRouteController');
const router = express.Router();

router.post('/',login)

module.exports = router;