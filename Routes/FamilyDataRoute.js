const express = require("express");
const router = express.Router();
const {getFamilyData,AddFamilyData,EditFamilyData} = require("../Controller/FamilyDataController");
const { authenticateToken } = require("../Middleware/authMiddleware.js");
const { addFamilyDataJoi, editFamilyDataJoi } = require("../Middleware/joiMiddleware.js");


router.get("/",authenticateToken,getFamilyData);
router.post("/",authenticateToken,addFamilyDataJoi,AddFamilyData);
router.put("/:id",authenticateToken,editFamilyDataJoi,EditFamilyData);


module.exports = router;