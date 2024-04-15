const express = require("express");


// const sql = require("mssql");
const app = express();
app.use(express.json());


const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/PatientData",require("./Routes/RegisterDataRoute.js"));
app.use("/api/login",require("./Routes/LoginRoute.js"));
app.use("/api/login",require("./Routes/LoginRoute.js"));
app.use("/api/FamilyData", require("./Routes/FamilyDataRoute.js"));
app.use('/patients', require('./Routes/patientRoutes'));
app.use("/uploads", require("./Routes/documentRoutes.js"));






app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

