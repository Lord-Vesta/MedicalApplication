// const db = require('../Config/config.js');
// const jwt = require("jsonwebtoken");

import {db} from "../Config/config.js"
import jwt from "jsonwebtoken"

export const getPatientPersonalData = (req, res) => {
    db.query(
        "SELECT * FROM personalInfo",
        (error, results) => {
            if (error) {

                return res.status(500).json({ error: "Database error" });
            }
            else{
                res.status(200).json(results);
            }
        });
};

export const createPatient = (req, res) => {
    try {
        let token = req.headers.authorization;
        const decoded = jwt.verify(token, "shhhh");
        const {firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription } = req.body;
        console.log(req.body);
        console.log(decoded);



        if (!firstName || !lastName || !mobileNumber || !dateOfBirth || !weight || !height || !countryOfOrigin || isDiabetic === undefined || !hasCardiacIssues === undefined || !hasBloodPressureConcerns === undefined || !diseaseType || !diseaseDescription) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let birthDate = new Date(`${dateOfBirth}`)
        // console.log(birthDate);
        let curr = new Date()
        let diff = curr - birthDate;
        let age = Math.floor(diff / 31557600000)
        console.log(age);

        let heightInMeters = parseFloat(height.split('-')[0]) * 0.3048 + parseFloat(height.split('-')[1]) * 0.0254; 
        let bmi = parseFloat(weight) / (heightInMeters * heightInMeters);


        db.query(
            "INSERT INTO personalInfo (userId, firstName, lastName, mobileNumber, dateOfBirth,age, weight, height,Bmi, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)",
            [decoded.ID, firstName, lastName, mobileNumber, dateOfBirth, age, weight, height,bmi, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription],
            (error, results) => {
                if (error) {
                    console.error("Error creating patient:", error);
                    return res.status(500).json({ error: "Internal server error" });
                }
                else {
                    res.status(201).json({ message: 'Patient created successfully', Data: results });
                }

            }
        );
    } catch (error) {
        console.error("Error creating patient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updatePatientPersonalData = (req, res) => {
    const patientId = req.params.id;
    const { firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription } = req.body;


    if (!firstName || !lastName || !mobileNumber || !dateOfBirth || !weight || !height || !countryOfOrigin || isDiabetic === undefined || !hasCardiacIssues === undefined || !hasBloodPressureConcerns === undefined || !diseaseType || !diseaseDescription) {
        return res.status(400).json({ error: "All fields are required" });
    }


    db.query(
        "UPDATE personalInfo SET firstName=?, lastName=?, mobileNumber=?, dateOfBirth=?, weight=?, height=?, countryOfOrigin=?, isDiabetic=?, hasCardiacIssues=?, hasBloodPressureConcerns=?, diseaseType=?, diseaseDescription=? WHERE userId=?",
        [firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription, patientId],
        (error, results) => {
            if (error) {
                console.error("Error updating patient data:", error);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Patient not found" });
            }

            res.status(200).json({ message: 'Patient data updated successfully' });
        }
    );
};

// module.exports = {getPatientPersonalData,updatePatientPersonalData,createPatient}