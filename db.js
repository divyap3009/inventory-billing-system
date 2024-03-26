const mongoose = require("mongoose");

const DB =
  "mongodb+srv://divyaprakash:prakash123@cluster0.jyiuam8.mongodb.net/inventory_db?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.log(`no connection`));

module.exports = DB;
