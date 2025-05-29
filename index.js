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

// app.get("/temu/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `SELECT * FROM mahasiswa WHERE nim = ${id}`;
//   db.query(sql, (error, hasil) => {
//     console.log(hasil.rows);
//     res.send("Datanya sudah ketemu");
//   });
// });

// app.get("/find", (req, res) =>{
//   const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`;
//   db.query(sql, (error, result) => {
//     if (error) throw error;
//     response(200, result.rows, "Find Mahasiswa Name", res);
//   });
// });

app.post("/tambah", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;

  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${namaLengkap}', '${kelas}', '${alamat}')`;
  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error buangs", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "Data added successfuly", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
