const cors = require("cors");
const express = require("express");
const app = express();

const connectDB = require("./db");

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
app.use("/api", require("./routes/lyricsRoutes"));
app.use("/api", require("./routes/audioRoutes"));
app.get("/", (req, res) => res.send("😊"));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
