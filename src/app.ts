import express from "express";
import Admin from "./routes/ffcs_admin";
import Student from "./routes/ffcs_student";
import connection from "./MySQL/config";
import { json, urlencoded } from "body-parser";

require('dotenv').config();
const app = express();

const cors = require('cors');
app.use(cors({
  origin: "https://dyte-hiring-docs.pages.dev" //Cors origin ID
}));

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/admin", Admin);
app.use("/", Student);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

const PORT = process.env.PORT;

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});