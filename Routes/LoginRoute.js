const express = require('express');
const { loginUser } = require('../Controller/LoginRouteController');
const { loginJoi } = require('../Middleware/joiMiddleware');
const router = express.Router();



router.post('/',loginJoi,loginUser)

module.exports = router;