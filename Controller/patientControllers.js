const pool = require('../config/database.js');

const getPatientPersonalData = (req, res) => {
    pool.query(
        "SELECT * FROM personalInfo",
        (error, results) => {
            if (error) {
                // console.error("Error fetching patient personal details:", error);
                return res.status(500).json({ error: "Database error" });
            }
            else{
                res.status(200).json(results);
            }
        });
};

const createPatient = (req, res) => {
    try {

        const { userId, firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription } = req.body;
        console.log(req.body);



        if (!userId || !firstName || !lastName || !mobileNumber || !dateOfBirth || !weight || !height || !countryOfOrigin || isDiabetic === undefined || !hasCardiacIssues === undefined || !hasBloodPressureConcerns === undefined || !diseaseType || !diseaseDescription) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let birthDate = new Date(`${dateOfBirth}`)
        let curr = new Date()
        let diff = curr - birthDate;
        let age = Math.floor(diff / 31557600000)
        console.log(age);

        pool.query(
            "INSERT INTO personalInfo (userId, firstName, lastName, mobileNumber, dateOfBirth,age, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
            [userId, firstName, lastName, mobileNumber, dateOfBirth, age, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription],
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

const updatePatientPersonalData = (req, res) => {
    const patientId = req.params.id;
    const { firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription } = req.body;


    if (!userId || !firstName || !lastName || !mobileNumber || !dateOfBirth || !weight || !height || !countryOfOrigin || isDiabetic === undefined || !hasCardiacIssues === undefined || !hasBloodPressureConcerns === undefined || !diseaseType || !diseaseDescription) {
        return res.status(400).json({ error: "All fields are required" });
    }


    pool.query(
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

module.exports = {getPatientPersonalData,updatePatientPersonalData,createPatient}