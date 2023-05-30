const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const connectDB = require("./db");

connectDB();

app.use(
  cors({
    origin: "https://*.crescn.app",
  })
);
app.use("/api", require("./routes/lyricsRoutes"));
app.use("/api", require("./routes/audioRoutes"));
app.use("/api", require("./routes/songRoutes"));

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
