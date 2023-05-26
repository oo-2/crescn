const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db");

connectDB();

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", require("./routes/lyricsRoutes"));
app.use("/api", require("./routes/audioRoutes"));
app.use("/api", require("./routes/songRoutes"));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
