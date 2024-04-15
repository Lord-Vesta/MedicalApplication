const db = require("../Config/config");

const abc = async () => {
  let result = await db.query("Select * from CredentialData");

  return result;
};

console.log(abc());
