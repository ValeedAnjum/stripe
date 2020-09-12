const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const stripe = require("stripe")("");
const app = express();
const PORT = 5000 || process.env.PORT;
//middleware
// app.use(express.json());
// app.use(cors());

//routes

app.get("/", (req, res) => {
  res.send("learing strsipe");
});
//listen

app.listen(PORT, () => console.log(`server is up at ${PORT}`));
