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
    "delete from CredentialData where Id =?",
    [Id],
    async (err, result) => {
      if (err) {
        callback({ error: "Database error" });
      } else  {
        return callback(result);
      }
    }
  );
};

const login = (Email,callback) => {
    db.query("select * from CredentialData where Email =?",[Email],async (err, result) => {
        if(err){
            callback({error: "Database error"})
        }
        else{
            return callback(result)
        }
    })
}

const ListData = (callback) => {
    db.query("select * from CredentialData",async (err, result) => {
        if(err){
            callback({error: "Database error"})
        }
        else{
            callback(result)
        }
    })
}

 const listFamilyData = (callback)=>{
    db.query("select * from FamilyData",async (err, result) => {
        if(err){
            callback({error: "Database error"})
        }
        else{
            callback(result)
        }
    })
 }



module.exports = {
  checkAlreadyPresent,
  InsertintoData,
  deleteData,
  ListData,
  login,
  listFamilyData
  
};
