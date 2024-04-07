const express = require('express');
const { loginUser } = require('../Controller/LoginRouteController');
const router = express.Router();

router.post('/',loginUser)

module.exports = router;