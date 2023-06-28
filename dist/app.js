"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ffcs_admin_1 = __importDefault(require("./routes/ffcs_admin"));
const ffcs_student_1 = __importDefault(require("./routes/ffcs_student"));
const config_1 = __importDefault(require("./MySQL/config"));
const body_parser_1 = require("body-parser");
require('dotenv').config();
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors({
    origin: "https://dyte-hiring-docs.pages.dev" //Cors origin ID
}));
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/admin", ffcs_admin_1.default);
app.use("/", ffcs_student_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
const PORT = process.env.PORT;
config_1.default
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
