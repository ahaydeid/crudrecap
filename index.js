import express from "express";
const app = express();
import bodyParser from "body-parser";
import db from "./connection.js";
// import response from "./response.js";
import multer from "multer";
import path from "path";
const port = 3000;

app.set("view engine", "hbs");
// app.use(express.static("public"));

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));

// Tambilkan Data
app.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM mahasiswa ORDER BY id DESC");
  res.render("form", { hasil: data.rows });
});

// Tambahkan Data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.post("/submit", upload.single("foto"), (req, res) => {
  const { name, nim, kelas, alamat } = req.body;
  const foto = req.file ? req.file.filename : null;
  const sql = `INSERT INTO mahasiswa (nama_lengkap, nim, kelas, alamat, foto) VALUES ('${name}', '${nim}', '${kelas}', '${alamat}', '${foto}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Gagal Tambahkan Data");
    }
  });
  res.redirect("/");
});

// Edit Data
// Alihkan Ke halaman edit
app.get("/edit/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = '${nim}'`;
  db.query(sql, (err, result) => {
    console.log(result.rows);
    res.render("edit", { data: result.rows[0] });
  });
});
// Update data dengan data dari halaman edit
app.post("/update", (req, res) => {
  const { name, nim, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${name}', nim = '${nim}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = '${nim}'`;
  db.query(sql, (err, result) => {
    if (result.rowCount > 0) {
      console.log("Update Berhasil");
    }
  });
  res.redirect("/");
});

//Hapus Data
app.delete("/:nim", (req, res) => {
  const { nim } = req.params;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (error, fields) => {
    if (fields.rowCount > 0) {
      console.log("Data berhasil dihapus");
    }
  });
  // res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
