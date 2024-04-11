const express = require('express');
const { addRegistrationData, deleteRegistrationData,listRegistration,addAdminRegistration } = require('../Controller/RegisterDataController');
const { authenticateToken } = require("../Middleware/authMiddleware.js");
const router = express.Router()

router.get('/',authenticateToken,listRegistration)
router.post('/' ,addRegistrationData)
router.post('/admin' ,addAdminRegistration)
router.delete('/:id',authenticateToken ,deleteRegistrationData)


module.exports = router;