const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("dotenv").config();
const connectDB = require("./db");
const port = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api", require("./routes/lyricsRoutes"));
app.use("/api", require("./routes/audioRoutes"));
app.use("/api", require("./routes/songRoutes"));

// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
const rooms = {};
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("createRoom", (data) => {
    const { roomId, username } = data;
    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [],
      };
      const user = {
        user: username,
        privilege: 3,
        joinTimestamp: Date.now(),
      };
      rooms[roomId].users.push(user);
      console.log(`Room created ${roomId} on socket ${socket.id} by user ${username}`);
      const usernames = rooms[roomId].users.map(({user}) => user);
      socket.join(roomId);
      socket.emit("roomCreated", data);
      socket.emit("users", usernames);
    } else {
      socket.emit("error", { message: "Room already exists" });
    }
  });

  socket.on("joinRoom", (data) => {
    const { roomId, username } = data;
    console.log(data)
    if (rooms[roomId]) {
      const user = {
        user: username,
        privilege: 1, // Default privilege level
        socketId: socket.id,
        joinTimestamp: Date.now(),
      };
      rooms[roomId].users.push(user);
      console.log(`User ${username} joined room: ${roomId}`);
      
      socket.join(roomId);
      io.to(roomId).emit("userJoined", roomId);
      io.to(roomId).emit("userUpdate", roomId);
    } else {
      socket.emit("error", { message: "Room does not exist" });
    }
  });

  socket.on("userUpdate", ( roomId ) => {
    const usernames = rooms[roomId].users.map(({user}) => user);
    console.log("hey someone joined ig");
    socket.emit("users", usernames);
  });
});
server.listen(port, () => console.log(`Server running on port ${port}`));
