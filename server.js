const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log("DB connected"));

const port = process.env.port || 8080;
const server = app.listen(port, () => {
  console.log("HELLOO");
});
