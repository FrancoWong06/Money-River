const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server");
});

app.use("", userRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
