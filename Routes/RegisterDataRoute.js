// const express = require('express');
// const { addRegistrationData, deleteRegistrationData,listRegistration,addAdminRegistration } = require('../Controller/RegisterDataController');
// const { authenticateToken } = require("../Middleware/authMiddleware.js");
// const { addRegistrationDataJoi,addAdminJoi } = require('../Middleware/joiMiddleware.js');


import express from 'express'
import {addRegistrationData, deleteRegistrationData,listRegistration,addAdminRegistration} from "../Controller/RegisterDataController.js"
import {authenticateToken} from "../Middleware/authMiddleware.js"
import {addRegistrationDataJoi,addAdminJoi} from "../Middleware/joiMiddleware.js"

export const router = express.Router()


router.get('/',authenticateToken,listRegistration)
router.post('/' ,addRegistrationDataJoi,addRegistrationData)
router.post('/admin' ,authenticateToken,addAdminJoi,addAdminRegistration)
router.delete('/',authenticateToken ,deleteRegistrationData)


// module.exports = router;