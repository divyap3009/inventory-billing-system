const express = require("express");
const bodyParser = require("body-parser");
const itemsRouter = require("./routes/items");
const billsRouter = require("./routes/bills");
const db = require("./db");

const app = express();

app.use(bodyParser.json());

app.use("/api/items", itemsRouter);
app.use("/api/bills", billsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
