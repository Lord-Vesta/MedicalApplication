const db = require("../Config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc check login data
// @route POST /api/login
// @access public

const login = (req, res) => {
  let { email, password } = req.body;
  console.log(email);
  let q = `select * from CredentialData where Email = ?`;
  db.query(q, [email], async (err, data) => {
    if (err) return res.json(err);
    else {
      if (data.length > 0) {
        let userPassword = data[0].passwords;
        let correctPassword = await bcrypt.compare(password, userPassword);
        if (correctPassword) {
          const token = jwt.sign(
            { ID:data[0].Id, email: data[0].Email, passwords: data[0].passwords },
            "shhhh",
            {
              expiresIn: "2h",
            }
          );
          res.json({Status:"successfull",
           Token:token});
          //   let Id = data[0].Id;
          //   db.query(
          //     `update CredentialData set token = ? where Id = ${Id}`,
          //     [token],
          //     (error, results) => {
          //       if (error) {
          //         res.status(404).json({ error: error });
          //       } else {
          //         res.status(201).json({
          //           result: results,
          //         });
          //         console.log(results);
          //       }
          //     }
          //   );
        } else {
          res.json("wrong password");
        }
      } else {
        res.json("wrong email");
      }
    }
  });
};

module.exports = {
  login,
};
