if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const midtransClient = require('midtrans-client');
const express = require("express");
const cors = require('cors')
const app = express();
const router = require("./router/index");
const errorHandler = require("./middleware/error");
const port = process.env.PORT||3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
