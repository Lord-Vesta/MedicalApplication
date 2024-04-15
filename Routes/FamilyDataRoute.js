// const express = require("express");
// const router = express.Router();
// const {getFamilyData,AddFamilyData,EditFamilyData} = require("../Controller/FamilyDataController");
// const { authenticateToken } = require("../Middleware/authMiddleware.js");
// const { addFamilyDataJoi, editFamilyDataJoi } = require("../Middleware/joiMiddleware.js");

import express from "express"; 
import {getFamilyData,AddFamilyData,EditFamilyData} from "../Controller/FamilyDataController.js"
import {authenticateToken} from "../Middleware/authMiddleware.js"
import { addFamilyDataJoi,editFamilyDataJoi } from "../Middleware/joiMiddleware.js";

export const router = express.Router();



router.get("/",authenticateToken,getFamilyData);
router.post("/",authenticateToken,addFamilyDataJoi,AddFamilyData);
router.put("/:id",authenticateToken,editFamilyDataJoi,EditFamilyData);

// export default router;


// module.exports = router;