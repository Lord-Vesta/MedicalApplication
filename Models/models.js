import {db} from "../Config/config.js"

export const checkAlreadyPresent = (Email, callback) => {
  db.query(
    "Select Id from CredentialData where Email = ?",
    [Email],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const insertIntoData = (Email, Password, roles, flag, callback) => {
  db.query(
    "insert into CredentialData(Email, Password ,roles,flag) values (?,?,?,?)",
    [Email, Password, roles, flag],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const deleteData = (Id, callback) => {
  db.query(
    `update CredentialData set flag = false WHERE Id = ?;`,
    [Id],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};


export const login = (Email, callback) => {
  db.query(
    "select * from CredentialData where Email =?",
    [Email],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const ListData = (callback) => {
  db.query(
    "select Id,Email,roles from CredentialData where flag = true",
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        callback(result);
      }
    }
  );
};

export const listFamilyData = (callback) => {
  db.query("select * from FamilyData", async (err, result) => {
    if (err) {
      callback({ error: "Database error" });
    } else {
      callback(result);
    }
  });
};

export const checkId = (Id, callback) => {
  db.query(
    "select * from CredentialData where Id = ?",
    [Id],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const listSpecificData = (Id, callback) => {
  db.query(
    `select * from FamilyData where Id = ?`,
    [Id],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const addFamilyData = (ID, body, callback) => {
  const {
    FathersName,
    FathersAge,
    FathersCountry,
    MothersName,
    mothersAge,
    motherCountry,
    diabetic,
    preDiabetic,
    CardiacPast,
    cardiacPresent,
    bloodPressure,
  } = body;
  db.query(
    "insert into FamilyData (Id,FathersName,FathersAge,FathersCountry,MothersName,mothersAge,motherCountry,diabetic,preDiabetic,CardiacPast,cardiacPresent,bloodPressure) values (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      ID,
      FathersName,
      FathersAge,
      FathersCountry,
      MothersName,
      mothersAge,
      motherCountry,
      diabetic,
      preDiabetic,
      CardiacPast,
      cardiacPresent,
      bloodPressure,
    ],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const editfamilydata = (
  stmts,
  values,
  callback
  // pass req.body if large nos of parameters
) => {
  // console.log(stmts, values); 
  db.query(
    `UPDATE FamilyData SET ${stmts.join(", ")} WHERE Id = ?`,
    values,
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};


export const getPatientPersonalData = (callback) => {
  db.query("select * from personalInfo", async (err, result) => {
    if (err) {
      callback({ error: "Database error" });
    } else {
      callback(result);
    }
  });
};

export const listSpecificPatientData = (Id, callback) => {
  db.query(
    `select * from personalInfo where Id = ?`,
    [Id],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const createPatientDb = (ID, body, callback) => {
  const {
      firstName,
      lastName,
      mobileNumber,
      dateOfBirth,
      age,
      weight,
      height,
      Bmi,
      countryOfOrigin,
      isDiabetic,
      hasCardiacIssues,
      hasBloodPressureConcerns,
      diseaseType,
      diseaseDescription
  } = body;

  db.query(
      "INSERT INTO personalInfo (Id, firstName, lastName, mobileNumber, dateOfBirth, age, weight, height, Bmi, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
          ID,
          firstName,
          lastName,
          mobileNumber,
          dateOfBirth,
          age,
          weight,
          height,
          Bmi,
          countryOfOrigin,
          isDiabetic,
          hasCardiacIssues,
          hasBloodPressureConcerns,
          diseaseType,
          diseaseDescription
      ],
      async (err, result) => {
          if (err) {
              callback({ error: "Database error" });
          } else {
              return callback(result);
          }
      }
  );
};

export const updatePatientPersonalDataDb = (
  updateKey,
  updateValues,
  callback
  // pass req.body if large nos of parameters
) => {
  console.log(updateKey, updateValues);
  db.query(
    `UPDATE personalInfo SET ${updateKey.join(", ")} WHERE Id = ?`,
    updateValues,
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};



export const ListSpecificUploadedDoc = (Id, callback) => {
  db.query(
    `select * from UploadedDocuments where Id = ?`,
    [Id],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else {
        return callback(result);
      }
    }
  );
};

export const uploadDocument = (
  Id,
  aadharCardFrontPath,
  aadharCardBackPath,
  medicalInsuranceCardFrontPath,
  medicalInsuranceCardBackPath,
  callback
) => {
  db.query(
    `
    INSERT INTO UploadedDocuments (Id, aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      Id,
      aadharCardFrontPath,
      aadharCardBackPath,
      medicalInsuranceCardFrontPath,
      medicalInsuranceCardBackPath,
    ],
    (err, result) => {
      if (err) {
        console.error('Error uploading documents:', err);
        callback({ error: "Database error: " + err.message });
      } else {
        callback(result);
      }
    }
  );
};




export const updateDocumentsModel = (
  updateKey,
  updateValues,
  callback
) => {
  db.query(`update UploadedDocuments set ${updateKey.join(", ")} where Id=?`, updateValues,
  (err, result) => {
    if (err) {
      callback({ error: "Database error: " + err.message });
    } else {
      return callback(result);
    }
  }
  );
};

// module.exports = {
//   checkAlreadyPresent,
//   insertIntoData,
//   deleteData,
//   ListData,
//   login,
//   listFamilyData,
//   checkId,
//   listSpecificData,
//   addFamilyData,
//   editfamilydata,
//   uploadDocument,
//   updateDocumentsModel
// };

