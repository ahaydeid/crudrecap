import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud_recap",
  password: "ahadiPOSTGRES",
  port: 5432,
});

export default db;
