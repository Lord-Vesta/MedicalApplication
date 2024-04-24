import {db} from "../Config/config.js"
import asyncHandler from 'express-async-handler'

export const checkAlreadyPresent = (Email, callback) => {
  db.query(
    "Select Id from CredentialData where Email = ? and flag = true",
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

export const deleteData = asyncHandler(async(Id, callback) => {
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

});


export const login = (Email, callback) => {
  console.log("inside login");
  console.log(Email);
  db.query(
    "select * from CredentialData where Email =? and flag = true;",
    [Email],
    async (err, result) => {
      if (err) {
        // console.log(err);
        callback({ error: "Database error" });
      } else {
        // console.log(result);
        return callback(result);
      }
    }
  );
  console.log("at the end of login");
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
  db.query("select * from FamilyData where flag = true", async (err, result) => {
    if (err) {
      callback({ error: "Database error" });
    } else {
      callback(result);
    }
  });
};

export const listSpecificRegistrationData = (Id,callback)=>{
  db.query("select Id,Email,roles from CredentialData where Id = ? and flag = true",[Id], async (err, result) => {
    if (err) {
      callback({ error: "Database error" });
    } else {
      return callback(result);
    }
  });
}

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
  console.log("inside specific");
  console.log(typeof Id);
  console.log(Id);
  db.query(
    "select * from FamilyData where Id = ? and flag = true",
    [Id],
    async (err, result) => {
      if (err) {
        console.log(err);
        console.error("Database error:", err); 
        callback({ error: "Database error" });
      } else {
        console.log("inside result");
        console.log(result);
        return callback(result);
      }
    }
  );
};

export const listFamilyDataWithoutFlag = (Id,callback)=>{
  console.log("inside flag");
  console.log(Id);
  db.query(`select * from FamilyData where Id = ?`,[Id],async(err, result) => {
    if(err){
      console.log(err);
      callback({error: "Database error"})
    }
    else{
      console.log(result);
      return callback(result)
    }
  })
}

export const addFamilyData = (ID, body,flag, callback) => {
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
    "insert into FamilyData (Id,FathersName,FathersAge,FathersCountry,MothersName,mothersAge,motherCountry,diabetic,preDiabetic,CardiacPast,cardiacPresent,bloodPressure,flag) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      flag
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
    `UPDATE FamilyData SET ${stmts.join(", ")} WHERE Id = ? and flag = true;`,
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

listSpecificPatientData(99,function(result){
  console.log(result);
})

export const createPatientDb = (ID, body,age,bmi, callback) => {
  const {
      firstName,
      lastName,
      mobileNumber,
      dateOfBirth,
      weight,
      height,
      countryOfOrigin,
      isDiabetic,
      hasCardiacIssues,
      hasBloodPressureConcerns,
      diseaseType,
      diseaseDescription
  } = body;
  const Patientage=age;
  const Patientbmi=bmi;

  db.query(
      "INSERT INTO personalInfo (Id,flag, firstName, lastName, mobileNumber, dateOfBirth, age, weight, height, Bmi, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
          ID,
          true,
          firstName,
          lastName,
          mobileNumber,
          dateOfBirth,
          Patientage,
          weight,
          height,
          Patientbmi,
          countryOfOrigin,
          isDiabetic,
          hasCardiacIssues,
          hasBloodPressureConcerns,
          diseaseType,
          diseaseDescription
      ],
      async (err, result) => {
          if (err) {
            console.log(err);
              callback({ error: "Database error" });
          } else {
              return callback(result);
          }
      }
  );
};

export const AddAnotherFamilyData = (stmts, values,callback) => {
  console.log("inside db stmts",stmts);
  console.log("inside db values",values);
  db.query(`UPDATE familyData SET ${stmts.join(", ")}`,values,async(err,result)=>{
    if(err){
      console.log(err);
      callback({error: "Database error"})
    }
    else{
      console.log(result);
      return callback(result)
    }
  })
}

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
  aadharCardFront,
  aadharCardBack,
  medicalInsuranceCardFront,
  medicalInsuranceCardBack,
  callback
) => {
  db.query(
    `
    INSERT INTO UploadedDocuments (Id, aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      Id,
      aadharCardFront,
      aadharCardBack,
      medicalInsuranceCardFront,
      medicalInsuranceCardBack,
    ],
    async (err, result) => {
      if (err) {
        console.error('Error uploading documents:', err);
        console.log(err);
        callback({ error: "Database error: " + err.message });
      } else {
        console.log("result in db",result);
        callback(result);
      }
    }
  );
};



// export const updateDocumentsModel = (
//   updateKey,
//   updateValues,
//   callback
// ) => {
//   db.query(`update UploadedDocuments set ${updateKey.join(", ")} where Id=?`, updateValues,
//   (err, result) => {
//     if (err) {
//       callback({ error: "Database error: " + err.message });
//     } else {
//       return callback(result);
//     }
//   }
//   );
// };
export const updateDocumentPaths = async (userId, filePaths, callback) => {
   const { aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack } = await filePaths;
  // const query = ;
  // const values = [];
  // console.log(aadharCardFront,aadharCardBack,medicalInsuranceCardFront,medicalInsuranceCardBack,userId);

  db.query(`
  update UploadedDocuments set aadharCardFront = ?,aadharCardBack = ?,medicalInsuranceCardFront=?,medicalInsuranceCardBack=? where Id = ?;
  `, [aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack, userId], (err, result) => {
    if (err) {
      console.log(err);
      callback({ error: "Database error" });
    } else {
      console.log(result);
      callback({error:null,result:result});
      
    }
  });
};


export const checkDocAlreadyPresent = (userId, callback) => {
  // const { aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack } = filePaths;
  const query = "SELECT * FROM UploadedDocuments WHERE Id=?";
  const values = [userId];

  db.query(query, values, async (err, result) => {
      if (err) {
          callback({ error: "Database error" });
      } else {
          callback(result);
      }
  });
};


