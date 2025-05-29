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
    response(200, result.rows, "Get all data from table mahasiswa", res);
  });
});

// app.post("/halo", (req, res) => {
//   const data = req.body;
//   if (data.username == "ahadi" && data.password == "admin123") {
//     res.send("Login berhasil");
//     console.log("Login berhasil");
//     console.log(`Selamat datang ${data.username}`);
//   } else {
//     res.send("Username/Password salah");
//     console.log("Username/Password salah");
//   }
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
