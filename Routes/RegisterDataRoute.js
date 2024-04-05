const express = require('express');
const { AddRegistrationData, DeleteRegistrationData,listRegistration } = require('../Controller/RegisterDataController');
const router = express.Router()
router.get('/',listRegistration)
router.post('/', AddRegistrationData)
router.delete('/:id', DeleteRegistrationData)


module.exports = router;