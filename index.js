import express from "express";
const app = express();
import bodyParser from "body-parser";
const port = 3000;
import db from "./connection.js";
import response from "./response.js";

app.use(bodyParser.json());

// Penulisan routes
app.get("/", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, result) => {
    response(200, result, "Get all data from table mahasiswa", res);
  });
});

app.get("/find", (req, res) => {
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`;
  db.query(sql, (error, result) => {
    response(200, result.rows, "Find Mahasiswa Name", res);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
