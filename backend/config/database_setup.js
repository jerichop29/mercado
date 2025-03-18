import mysql from "mysql2";
import fs from "fs";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true,
});

const databaseName = "mercado-database";

connection.query(`SHOW DATABASES LIKE ?`, [databaseName], (err, results) => {
  if (err) {
    console.error("Error checking database:", err);
    connection.end();
    process.exit(1);
  }

  if (results.length > 0) {
    console.log(`Database '${databaseName}' already exists. Skipping SQL execution.`);
    connection.end();
    process.exit(0); // Stop Node.js
  } else {
    console.log(`Database '${databaseName}' does not exist. Creating and importing data...`);

    connection.query(`CREATE DATABASE \`${databaseName}\``, (err) => {
      if (err) {
        console.error("Error creating database:", err);
        connection.end();
        process.exit(1);
      }

      console.log(`Database '${databaseName}' created successfully.`);

      const dbConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: databaseName,
        multipleStatements: true,
      });

      const sqlFile = fs.readFileSync(`backend/config/${databaseName}.sql`, "utf8");
      dbConnection.query(sqlFile, (error) => {
        if (error) {
          console.error("Error executing SQL file:", error);
          process.exit(1);
        } else {
          console.log("SQL file executed successfully!");
          dbConnection.end();
          process.exit(0); // Stop Node.js after execution
        }
      });
    });
  }
});
