const express = require('express');
const { addRegistrationData, deleteRegistrationData,listRegistration,addAdminRegistration } = require('../Controller/RegisterDataController');
const { authenticateToken } = require("../Middleware/authMiddleware.js");
const { addRegistrationDataJoi,addAdminJoi } = require('../Middleware/joiMiddleware.js');
const router = express.Router()


router.get('/',authenticateToken,listRegistration)
router.post('/' ,addRegistrationDataJoi,addRegistrationData)
router.post('/admin' ,authenticateToken,addAdminJoi,addAdminRegistration)
router.delete('/:id',authenticateToken ,deleteRegistrationData)


module.exports = router;