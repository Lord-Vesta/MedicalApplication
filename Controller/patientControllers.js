
 
import { createPatientDb, getPatientPersonalData, listSpecificPatientData, updatePatientPersonalDataDb } from "../Models/models.js";
import { verifyToken } from "../Utils/jwtutils.js";
 
export const getPatientData = (req, res) => {
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
                } else if (!result.length) {
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
 
export const CreatePatient = (req, res) => {
    console.log("hello");
    try {
        const authHeader = req.headers["authorization"];
        let decodedToken = verifyToken(authHeader);
        const Id = decodedToken.data.ID;

        // console.log(Id);
        listSpecificPatientData(Id,async function (result){
            if(result.length>0){
                res.status(409).json({
                    status: 409,
                    error: "Patient already exists",
                    message: "Patient with this Id already present",
                });
 
            }
            else {
                const { height, weight, dateOfBirth } = await req.body;
                console.log(height);
                const heightParts = await height.split("-");
                const feet = parseInt(heightParts[0], 10);
                const inches = parseInt(heightParts[1], 10);
 
 
                const heightInCm = (feet * 12 + inches) * 2.54;
 
                const weightAsNumber = parseFloat(weight);
 
 
                const bmi = weightAsNumber / (heightInCm / 100 * heightInCm / 100);
 
 
                const today = new Date();
                const birthDate = new Date(dateOfBirth);
                let age = today.getFullYear() - birthDate.getFullYear();
                const month = today.getMonth() - birthDate.getMonth();
                if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
 
                req.body.age = age;
                req.body.Bmi = bmi;
 
                createPatientDb(decodedToken.data.ID, req.body, age, bmi, async function (result) {
                    if (result) {
                        res.status(200).json({
                            status: 200,
                            message: "Data is successfully added to Personal Form of the Patient",
                            data: result,
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Server error",
            message: err.message,
        });
    }
};
 
 
export const UpdatePatientPersonalData = (req, res) => {
    try {
        const Id = parseInt(req.params.id);
        let allColumns = [
            "firstName",
            "lastName",
            "mobileNumber",
 
            "weight",
            "height",
 
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
        if(dateOfBirth in req.body){
            
        }
        if (decodedToken.data.roles = "admin") {
            for (let column of allColumns) {
                if (column in req.body) {
                    console.log(req.body);
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
 
 
 
 
 
 
 
 
 
 
 
 
 