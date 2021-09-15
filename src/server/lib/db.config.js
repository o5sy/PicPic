import MySQL from "mysql";

const connection = MySQL.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

async function dbConfig() {
  let conn, code;
  try {
    connection.query("SELECT * from testtable", (err, rows, fields) => {
      console.log(err, rows);
      if (!err) console.log(`The solution is: ${rows}`);
      else console.log(`Error while performing Query. ${err}`);
    });
    connection.end();
    console.log("Initialized!");
    code = 0;
  } catch (err) {
    code = 1;
  }
}

export default dbConfig;
