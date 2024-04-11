const db = require("../Config/config");

const checkAlreadyPresent = (Email, callback) => {
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

const insertIntoData = (Email, Password, roles, flag, callback) => {
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

const deleteData = (Id, callback) => {
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

deleteData(1, function (result) {
  console.log(result);
});

const login = (Email, callback) => {
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

const ListData = (callback) => {
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

const listFamilyData = (callback) => {
  db.query("select * from FamilyData", async (err, result) => {
    if (err) {
      callback({ error: "Database error" });
    } else {
      callback(result);
    }
  });
};

const checkId = (Id, callback) => {
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

const listSpecificData = (Id, callback) => {
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

const addFamilyData = (ID, body, callback) => {
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

const editfamilydata = (
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

const uploadDocument = (
  userId,
  aadharCardFront,
  aadharCardBack,
  medicalInsuranceCardFront,
  medicalInsuranceCardBack,
  callback
) => {
  // console.log(aadharCardFront);

  db.query(
    `
    INSERT INTO UploadedDocuments (userId, aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      userId,
      aadharCardFront,
      aadharCardBack,
      medicalInsuranceCardFront,
      medicalInsuranceCardBack,
    ],
    async (err, result) => {
      if (err) {
        console.error('Error uploading documents:', err);
        // callback({ error: "Database error: " + err.message });
      } else {
        return callback(result);
      }
    }
  );
};


const updateDocumentsModel = (
  updateKey,
  updateValues,
  callback
) => {
  db.query(`update UploadedDocuments set ${updateKey.join(", ")} where userId=?`, updateValues,
  (err, result) => {
    if (err) {
      callback({ error: "Database error: " + err.message });
    } else {
      return callback(result);
    }
  }
  );
};

module.exports = {
  checkAlreadyPresent,
  insertIntoData,
  deleteData,
  ListData,
  login,
  listFamilyData,
  checkId,
  listSpecificData,
  addFamilyData,
  editfamilydata,
  uploadDocument,
  updateDocumentsModel
};

