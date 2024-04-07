const { checkAlreadyPresent } = require("../Models/models");



const insertDoctorData = (req, res) => {
    const { Email, Passwords,roles } = req.body;
    const token = req.headers.authorization.split(' ')[1]
    const userIdValue = jwt.verify(token, process.env.JWT_SECRET)
    checkAlreadyPresent(Email, function (result) {
        if (result.length > 1) {
            res.status(400).json({ error: "Email already exists" }); 
        }
            else {
                console.log(Email,Passwords,roles);
            }
    })
}

module.exports = {
    insertDoctorData
}