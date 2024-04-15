// const express = require('express');
// const { loginUser } = require('../Controller/LoginRouteController');
// const { loginJoi } = require('../Middleware/joiMiddleware');

import express from "express";
import {loginUser} from "../Controller/LoginRouteController.js"
import {loginJoi} from "../Middleware/joiMiddleware.js"

export const router = express.Router();



router.post('/',loginJoi,loginUser)

// module.exports = router;