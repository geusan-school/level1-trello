import mysql from 'mysql';

// const CREATE_DATABASE = "CREATE DATABASE trello;";
// const SHOW_DABASES = "SHOW DATABASES;";
// const CREATE_TABLE = `
//   CREATE TABLE tasks (
//     title VARCHAR(50),
//     description VARCHAR(200),
//     id int AUTO_INCREMENT PRIMARY KEY,
//     section int,
//     priority int
//   );
// `;
// const SHOW_TABLES = "SHOW TABLES;";
// const INSERT_INTO = `INSERT INTO tasks (title, description, section, priority) VALUES ('Title', 'Description', 0, 0);`;
// SELECT * FROM tasks;
// UPDATE tasks SET title = 'TT' WHERE id = 1;
// DELETE FROM tasks WHERE id = 2;

function main() {
  const connection = mysql.createConnection({
    host: "***",
    port: 3306,
    user: "***",
    password: "***",
    database: "trello",
  });
  connection.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('mysql is connected'); 
    connection.query(
      `
      SELECT * FROM tasks;
    `,
      (err, data) => {
        if (err) {
          console.log("error", err);
          return;
        }
        console.log(data);
      }
    );
    connection.commit();
    // process.exit(1);
  });
}

main();
