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

// app.post("/tambah", (req, res) => {
//   const { nim, namaLengkap, kelas, alamat } = req.body;
//   const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${namaLengkap}', '${kelas}', '${alamat}')`;
//   db.query(sql, (err, result) => {
//     // Kalau error
//     if (err) {
//       console.error(err);
//       return response(500, null, "error buangs", res);
//     }

//     // Kalau berhasil
//     if (result.rowCount > 0) {
//       response(200, null, "Data berhasil ditambahkan", res);
//     } else {
//       response(400, null, "Data gagal ditambahkan", res);
//     }
//   });
// });

// app.put("/update", (req, res) => {
//   const { nim, namaLengkap, kelas, alamat } = req.body;
//   const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = '${nim}'`;

//   db.query(sql, (err, result) => {
//     if (err) response(500, "Invalid", "Error", res);
//     if (result.rowCount > 0) {
//       response(200, "OK", "Data updated successfully", res);
//     } else {
//       response(404, "Failed", "User not found", res);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
