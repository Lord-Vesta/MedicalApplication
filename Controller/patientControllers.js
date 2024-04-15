const {
    getPatientPersonalData,
    listSpecificPatientData,
    createPatientDb,
    updatePatientPersonalDataDb

} = require("../Models/models.js");

const { verifyToken } = require("../Utils/jwtutils.js");

const getPatientData = (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);
        if (decodedToken.data.roles === "admin") {
            getPatientPersonalData(async function (result) {
                if (result.length > 0) {
                    res.status(201).json({
                        status: 201,
                        message: "Data displayed successfully",
                        data: result
                    });
                } else if (result.length <= 0) {
                    res.status(200).json({
                        status: 204,
                        data: result
                    });
                }
            });
        } else if (decodedToken.data.roles = "user") {
            const Id = decodedToken.data.ID;
            listSpecificPatientData(Id, async function (result) {
                if (result.length > 0) {
                    res.status(201).json({
                        status: 201,
                        message: "Data displayed successfully",
                        data: result
                    });
                } else if (result.length <= 0) {
                    res.status(204).json({
                        status: 204,
                        message: "no content is available",
                        data: result
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ status: 500, error: "Server error", message: error.message });
    }
};


    
const CreatePatient = (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);
        const Id = decodedToken.data.ID;

        listSpecificPatientData(Id,async function (result){
            if(result.length>0){
                res.status(409).json({
                    status:409,
                    error:"Patient already exists",
                    message:"Patient with this Id already present"
                });
            }else{
                createPatientDb(decodedToken.data.ID,req.body, async function(result){
                    if(result){
                        res.status(200).json({
                            status:200,
                            message:"Data is successfully added to Personal Form of the Patient",
                            data:result,

                        });
                    }
                });
            }
        });
    } catch(e){
        res.status(500).json({
            status: 500,
            error: "Server error",
            message: err.message,
        })
    }
              
};


const UpdatePatientPersonalData = (req, res) => {
    try {
        const Id = parseInt(req.params.id);
        let allColumns = [
            "firstName",
            "lastName",
            "mobileNumber",
            "dateOfBirth",
            "age",
            "weight",
            "height",
            "Bmi",
            "countryOfOrigin",
            "isDiabetic",
            "hasCardiacIssues",
            "hasBloodPressureConcerns",
            "diseaseType",
            "diseaseDescription"
        ];
        let updateKey = [];
        let updateValues = [];
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);
        if (decodedToken.data.roles = "admin") {
            for (let column of allColumns) {
                if (column in req.body) {
                    updateKey.push(`${column}=?`),
                        updateValues.push(req.body[column]);
                }
            }
            if (updateKey.length == 0) {
                return res.sendStatus(204)
            }

            updateValues.push(Id);
            updatePatientPersonalDataDb(updateKey, updateValues, async function (result) {
                if (result) {
                    res.status(200).json({
                        status: "Patient Data Successfully edited",
                        data: result,
                    });
                } else {
                    res.status(400).json({
                        status: "No data found",
                    });
                }
            });
        } else {
            if (decodedToken.data.ID == req.params.id) {
                const Id = parseInt(req.params.id);
                updatePatientPersonalDataDb(Id, req.body, async function (result) {
                    if (result) {
                        res.status(200).json({
                            status: "Data Updated successfully",
                            message: "Data is Updated successfully",
                            data: result
                        });
                    }
                });
            } else {
                res.status(403).json({
                    status: 403,
                    error: "Invalid user role",
                    message: "You are not authorized to perform this action."
                });
            }
        }

    } catch (err) {
        res.status(500).json({
            status: 500, error: "Server error",
            message: err.message
        });
    }
};

module.exports = { getPatientData, CreatePatient, UpdatePatientPersonalData }
















// const db = require('../Config/config.js');
// const jwt = require("jsonwebtoken");

// const getPatientPersonalData = (req, res) => {
//     db.query(
//         "SELECT * FROM personalInfo",
//         (error, results) => {
//             if (error) {

//                 return res.status(500).json({ error: "Database error" });
//             }
//             else{
//                 res.status(200).json(results);
//             }
//         });
// };

// const createPatient = (req, res) => {
//     try {
//         let token = req.headers.authorization;
//         const decoded = jwt.verify(token, "shhhh");
//         const {firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription } = req.body;
//         console.log(req.body);
//         console.log(decoded);



//         if (!firstName || !lastName || !mobileNumber || !dateOfBirth || !weight || !height || !countryOfOrigin || isDiabetic === undefined || !hasCardiacIssues === undefined || !hasBloodPressureConcerns === undefined || !diseaseType || !diseaseDescription) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         let birthDate = new Date(`${dateOfBirth}`)
//         // console.log(birthDate);
//         let curr = new Date()
//         let diff = curr - birthDate;
//         let age = Math.floor(diff / 31557600000)
//         console.log(age);

//         let heightInMeters = parseFloat(height.split('-')[0]) * 0.3048 + parseFloat(height.split('-')[1]) * 0.0254;
//         let bmi = parseFloat(weight) / (heightInMeters * heightInMeters);


//         db.query(
//             "INSERT INTO personalInfo (userId, firstName, lastName, mobileNumber, dateOfBirth,age, weight, height,Bmi, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)",
//             [decoded.ID, firstName, lastName, mobileNumber, dateOfBirth, age, weight, height,bmi, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription],
//             (error, results) => {
//                 if (error) {
//                     console.error("Error creating patient:", error);
//                     return res.status(500).json({ error: "Internal server error" });
//                 }
//                 else {
//                     res.status(201).json({ message: 'Patient created successfully', Data: results });
//                 }

//             }
//         );
//     } catch (error) {
//         console.error("Error creating patient:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// const updatePatientPersonalData = (req, res) => {
//     const patientId = req.params.id;
//     const { firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription } = req.body;


//     if (!firstName || !lastName || !mobileNumber || !dateOfBirth || !weight || !height || !countryOfOrigin || isDiabetic === undefined || !hasCardiacIssues === undefined || !hasBloodPressureConcerns === undefined || !diseaseType || !diseaseDescription) {
//         return res.status(400).json({ error: "All fields are required" });
//     }


//     db.query(
//         "UPDATE personalInfo SET firstName=?, lastName=?, mobileNumber=?, dateOfBirth=?, weight=?, height=?, countryOfOrigin=?, isDiabetic=?, hasCardiacIssues=?, hasBloodPressureConcerns=?, diseaseType=?, diseaseDescription=? WHERE userId=?",
//         [firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription, patientId],
//         (error, results) => {
//             if (error) {
//                 console.error("Error updating patient data:", error);
//                 return res.status(500).json({ error: "Internal server error" });
//             }

//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ error: "Patient not found" });
//             }

//             res.status(200).json({ message: 'Patient data updated successfully' });
//         }
//     );
// };

// module.exports = {getPatientPersonalData,updatePatientPersonalData,createPatient}