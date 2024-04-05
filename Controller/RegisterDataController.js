const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Config/config.js");

// @desc Add registration data
// @route POST /api/PatientData
// @access private
const AddRegistrationData = (req, res) => {
  // let token = req.headers.authorization;
  // const decoded = jwt.verify(token, "shhhh");
  // console.log(decoded);
  const { Email, Passwords } = req.body;
  db.query(
    "Select * from CredentialData where Email = ?",
    [Email],
    async (error, results) => {
      if (error) {
        res.status(500).json({ error: "Database error" });
      } else {
        if (results.length > 0) {
          res.status(400).json({ error: "Email already exists" }); 
        } else {
          const myEncPassword = await bcrypt.hash(Passwords, 10);

          db.query(
            "insert into CredentialData(Email, passwords) values (?,?)",
            [Email, myEncPassword],
            (error, result) => {
              if (error) {
                res.status(404).json({ error: error });
              } else {
                res.status(201).json({
                  result: result,
                });
                console.log(result);
              }
            }
          );
        }
      }
    }
  );
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const DeleteRegistrationData = (req, res) => {
  const Id = parseInt(req.params.id);
  let q = "delete from CredentialData where Id = ?";
  db.query(q, [Id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
  });
  res.json("succerssfull");
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const listRegistration = (req, res) => {
  let q = "select * from CredentialData";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
};

module.exports = {
  listRegistration,
  AddRegistrationData,
  DeleteRegistrationData,
};
