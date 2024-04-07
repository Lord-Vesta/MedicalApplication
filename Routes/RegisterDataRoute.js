const express = require('express');
const { AddRegistrationData, DeleteRegistrationData,listRegistration } = require('../Controller/RegisterDataController');
const { authenticateToken } = require("../Middleware/authMiddleware.js");
const router = express.Router()

router.get('/',authenticateToken,listRegistration)
router.post('/' ,AddRegistrationData)
router.delete('/:id',authenticateToken ,DeleteRegistrationData)


module.exports = router;