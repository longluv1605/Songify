const { get } = require("http");
const mariadb = require("mariadb");
// require('dotenv').config();

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
// console.log(process.env.DB_NAME);

const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "longluv1605",
    port: 2021,
    database: "moflix",
    // connectionLimit: 100,
    // acquireTimeout: 60000, // Increase the connection timeout to 60 seconds
});

async function getNewMovies() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM pricing_plan");
      console.log(rows); //[ {val: 1}, meta: ... ]
    //   const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //   console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }


// const mysql = require('mysql2')

// const conn = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'longluv1605',
//   database: 'moflix',
//   port: 2021,
// })

// conn.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("Success");
// })

// conn.end();


getNewMovies();