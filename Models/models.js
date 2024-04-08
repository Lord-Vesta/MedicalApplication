const db = require("../Config/config");

const checkAlreadyPresent = (Email, callback) => {
  db.query(
    "Select * from CredentialData where Email = ?",
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

const InsertintoData = (Email, passwords, roles, callback) => {
  db.query(
    "insert into CredentialData(Email, passwords,roles) values (?,?,?)",
    [Email, passwords, roles],
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
    `DELETE FROM CredentialData WHERE Id = ?;`,
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

deleteData(1,function(result){
    console.log(result);
})

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
  db.query("select * from CredentialData", async (err, result) => {
    if (err) {
      callback({ error: "Database error" });
    } else {
      callback(result);
    }
  });
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

const addFamilyData = (
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
  callback
) => {
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
  Id,
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
  callback
) => {
  db.query(
    `update FamilyData set FathersName =?,FathersAge =?,FathersCountry =?,MothersName =?,mothersAge =?,motherCountry =?,diabetic =?,preDiabetic =?,CardiacPast =?,cardiacPresent =?,bloodPressure =? where Id =?`,
    [
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
      Id,
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

module.exports = {
  checkAlreadyPresent,
  InsertintoData,
  deleteData,
  ListData,
  login,
  listFamilyData,
  checkId,
  listSpecificData,
  addFamilyData,
  editfamilydata,
};
