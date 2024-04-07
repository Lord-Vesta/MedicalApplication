const express = require("express");
const router = express.Router();
const {getFamilyData,AddFamilyData,EditFamilyData} = require("../Controller/FamilyDataController");
const { authenticateToken } = require("../Middleware/authMiddleware.js");

router.get("/",authenticateToken,getFamilyData);
router.post("/",authenticateToken,AddFamilyData);
router.put("/:id",authenticateToken,EditFamilyData);


module.exports = router;