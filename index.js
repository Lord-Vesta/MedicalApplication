// const express = require("express");

import express from "express";


import {router as RegisterDataRoute} from "./Routes/RegisterDataRoute.js";
import {router as LoginRoute} from "./Routes/LoginRoute.js";
import {router as FamilyDataRoute } from "./Routes/FamilyDataRoute.js";
import {router as patientRoutes} from "./Routes/patientRoutes.js";
import {router as documentRoutes} from "./Routes/documentRoutes.js";

const app = express();
app.use(express.json());


const port = process.env.PORT || 3000;

// app.use(express.json());
app.use("/api/PatientData", RegisterDataRoute);
app.use("/api/login", LoginRoute);
app.use("/api/FamilyData", FamilyDataRoute);
app.use("/patients", patientRoutes);
app.use("/uploads", documentRoutes);



app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
