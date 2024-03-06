// const mysql = require("mysql2/promise");
// const dbConfig = require("../config/dbConfig");

// async function connectDatabase() {
//   try {
//     const connection = await mysql.createConnection(dbConfig);
//     console.log("Successfully connected to the database.");
//     return connection;
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw error;
//   }
// }

// module.exports = connectDatabase;

// const mysql = require("mysql");
// const dbConfig = require("../config/dbConfig");

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
// });

// // open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// module.exports = connection;

// const mysql = require("mysql");
// const dbConfig = require("../config/dbConfig");

// // Function to establish connection to the database
// function connectDatabase() {
//   const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
//   });

//   connection.connect((error) => {
//     if (error) {
//       console.error("Failed to connect to the database:", error);
//       return;
//     }
//     console.log("Successfully connected to the database.");
//   });

//   return connection;
// }

// module.exports = connectDatabase;

const mysql = require('mysql2/promise');
const config = require('../config/dbConfig');

async function query(sql, params) {
   const connection = await mysql.createConnection(config);
   const [results, ] = await connection.execute(sql, params);

   return results;
}

module.exports = {
   query
}
