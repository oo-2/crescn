const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:3000",
  },
});
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");


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

const fourChars = [
  "ably", "acre", "acts", "adds", "aged", "ages", "aims", "airy", "also", "alto",
  "amps", "arch", "area", "arms", "army", "arts", "asks", "atom", "aunt", "axis",
  "baby", "back", "ball", "band", "bank", "barn", "bars", "base", "bath", "bays",
  "beam", "bean", "bear", "beat", "beds", "bees", "bend", "best", "bias", "bike",
  "bill", "bind", "bird", "bite", "bits", "blow", "blue", "boat", "body", "bolt",
  "bond", "book", "boom", "boon", "boot", "born", "boss", "both", "bowl", "bulk",
  "bunk", "burn", "bush", "busy", "cage", "cake", "call", "calm", "came", "camp",
  "cane", "cape", "care", "cart", "case", "cash", "cast", "cats", "cave", "cell",
  "chat", "chef", "chic", "chin", "chip", "chop", "city", "clap", "clay", "clip",
  "clue", "coal", "coat", "code", "coil", "coin", "cold", "come", "cook", "cool",
  "cope", "cord", "core", "cork", "corn", "cost", "cove", "crew", "crop", "cube",
  "cure", "curl", "cute", "cuts", "dads", "dame", "damp", "dare", "dark", "dash",
  "data", "date", "dawn", "days", "deal", "dear", "debt", "deck", "deep", "deer",
  "dens", "desk", "dial", "dice", "died", "diet", "digs", "dime", "dine", "dips",
  "dirt", "disk", "dive", "dock", "does", "dogs", "dome", "done", "doom", "door",
  "dose", "dots", "dove", "draw", "drew", "drop", "drum", "dual", "duel", "dues",
  "duke", "dull", "dumb", "dune", "dusk", "dust", "duty", "each", "earn", "ears",
  "ease", "east", "easy", "eats", "edge", "ends", "envy", "epic", "even", "ever",
  "evil", "exam", "exit", "face", "fact", "fade", "fail", "fair", "fall", "fame",
  "fans", "fare", "farm", "fast", "fate", "faux", "fear", "feat", "feed", "feel",
  "fees", "feet", "fell", "felt", "file", "fill", "film", "find", "fine", "fire",
  "firm", "fish", "fist", "fits", "five", "flag", "flat", "flaw", "fled", "flee",
  "flew", "flip", "flow", "foam", "fold", "folk", "fond", "food", "fool", "foot",
  "ford", "form", "fort", "foul", "four", "free", "frog", "fuel", "full", "fund",
  "fury", "fuse", "fuss", "gala", "game", "gang", "gaps", "garb", "gash", "gate",
  "gave", "gaze", "gear", "gems", "gift", "gigs", "gill", "girl", "give", "glad",
  "glow", "glue", "goal", "goat", "gold", "gone", "gore", "gown", "grab", "gram",
  "gray", "grew", "grid", "grim", "grin", "grip", "grow", "gulf", "gull", "gust",
  "guts", "guys", "hair", "half", "hall", "halo", "hand", "hang", "hard", "harm",
  "harp", "hate", "have", "hawk", "haze", "head", "heal", "heap", "hear", "heat",
  "held", "hell", "helm", "help", "herb", "herd", "here", "hero", "hers", "hide",
  "high", "hike", "hill", "hilt", "hint", "hire", "hits", "hold", "hole", "home",
  "hood", "hook", "hope", "horn", "host", "hour", "hows", "huge", "hugs", "hump",
  "hunt", "hush", "hymn", "iced", "idea", "idle", "inch", "into", "iron", "item",
  "jazz", "jean", "jump", "just", "kept", "kick", "kill", "kind", "king", "kiss",
  "knee", "knew", "knit", "knot", "know", "lace", "lack", "lady", "laid", "lake",
  "lamp", "land", "lane", "laps", "last", "late", "lava", "lawn", "laws", "lays",
  "lead", "leaf", "leak", "lean", "leap", "left", "legs", "lend", "lens", "lent",
  "lets", "lick", "life", "lift", "like", "limb", "lime", "line", "link", "lion",
  "list", "live", "load", "loaf", "loan", "lock", "logo", "logs", "lone", "long",
  "look", "loop", "lord", "lose", "loss", "lost", "lots", "loud", "love", "luck",
  "lump", "lung", "made", "mail", "main", "make", "male", "mall", "many", "maps",
  "mark", "mart", "mask", "mass", "mate", "math", "maze", "meal", "mean", "meat",
  "meet", "melt", "mend", "menu", "mere", "mesh", "mess", "mild", "mile", "milk",
  "mill", "mind", "mine", "mint", "miss", "mist", "mode", "mood", "moon", "more",
  "most", "move", "much", "muse", "must", "mute", "name", "navy", "near", "neat",
  "neck", "need", "nest", "news", "next", "nice", "nick", "nigh", "nine", "node",
  "none", "nose", "note", "noun", "nuts", "oath", "obey", "odds", "okay", "once",
  "only", "onto", "open", "oral", "oven", "over", "pace", "pack", "page", "paid",
  "pail", "pain", "pair", "pale", "palm", "pane", "park", "part", "pass", "past",
  "path", "peak", "peal", "peel", "peer", "pest", "pets", "pick", "pile", "pill",
  "pine", "pink", "pint", "pipe", "plan", "play", "plot", "plow", "plum", "plus",
  "poem", "poet", "pole", "pond", "pool", "pops", "pore", "port", "pose", "post",
  "pour", "pray", "prep", "prey", "pull", "pulp", "pump", "pure", "push", "puts",
  "quit", "quiz", "race", "rack", "raft", "rage", "rain", "rank", "rare", "rate",
  "read", "real", "rear", "reel", "rest", "rice", "rich", "ride", "ring", "rise",
  "risk", "road", "roar", "rock", "role", "roll", "roof", "room", "root", "rope",
  "rose", "rows", "rule", "rush", "rust", "sack", "safe", "said", "sail", "salt",
  "same", "sand", "save", "seal", "seam", "seat", "seed", "seek", "seem", "seen",
  "self", "sell", "send", "sent", "sets", "sewn", "shed", "ship", "shoe", "shop",
  "shot", "show", "side", "sign", "silk", "sink", "site", "size", "skin", "slap", "slip",
  "slow", "slug", "snip", "soft", "soil", "sold", "some", "song", "sore", "sort",
  "soup", "spit", "spot", "star", "stay", "step", "stir", "stop", "such", "suit",
  "sure", "tail", "take", "tale", "talk", "tall", "tank", "tape", "tide", "tile",
  "time", "tire", "toad", "toll", "tone", "tool", "torn", "tour", "trap", "tree",
  "trip", "true", "tube", "turn", "twin", "type", "unit", "use", "vamp", "vast",
  "vibe", "vine", "vote", "wait", "walk", "wall", "want", "ware", "warm", "wasp",
  "wave", "wear", "wean", "week", "weep", "west", "what", "when", "wide", "wild",
  "will", "wind", "wine", "wing", "wish", "with", "wood", "wool", "word", "work",
  "worn", "wrap", "yawn", "year", "yell", "yoga", "zone", "zest", "zinc", "zany",
  "zeal", "zero", "zoom", "yoga", "yarn", "yoke", "yule", "yelp", "yank", "yawn",
  "yoga", "yelp", "yarn", "yule", "zeal", "zinc", "zone", "zest", "zinc", "zoom",
  "yarn", "yoke", "yawn", "yule", "yoga", "yarn", "zest", "zeal", "zero", "zone"
  ];

function getRandomFourChar() {
  const randomIndex = Math.floor(Math.random() * fourChars.length);
  return fourChars[randomIndex];
  }

function stringValidator() {
  /*TODO: Validate username inputs and room codes. */
}

const rooms = {};
io.on("connection", (socket) => {
  console.log(`${socket.id} connected on ${Date.now()}`); 
  socket.on("createRoom", (data) => {
    var { roomId, username } = data;
    if (rooms[roomId]) {
      socket.emit("error", { message: "Room already exists" });
      return;
    }
    if (!username) {
      socket.emit("error", { message: "Please input a username." });
      return;
    }
    while (!roomId.length) {
      newId = getRandomFourChar() + "-"+ socket.id.slice(0,2 )
      if(!rooms[roomId]) {
        roomId = newId;
      }
    }
      rooms[roomId] = {
        users: [],
        queue: []
      };
      const user = {
        user: username,
        id: socket.id,
        privilege: 3,
        joinTimestamp: Date.now(),
      };
      rooms[roomId].users.push(user);
      console.log(
        `Room created ${roomId} on socket ${socket.id} with username ${username} on ${Date.now()}`
      );
      
      socket.join(roomId);
      const usernames = rooms[roomId].users.map(({ user }) => user);
      const queue = rooms[roomId].queue;
      socket.emit("roomCreated", {roomId, username, usernames, queue });
  });

  socket.on("joinRoom", async (data) => {
    const { roomId, username } = data;
    if (!username) {
      socket.emit("error", { message: "Please input a username." });
      return;
    }
    if (!roomId) {
      socket.emit("error", { message: "Please input a room code or create your own!" });
      return;
    }
    if (!rooms[roomId]) {
      socket.emit("error", { message: "Room does not exist" });
      return;
    }
      const user = {
        user: username,
        privilege: 1,
        id: socket.id,
        joinTimestamp: Date.now(),
      };
      socket.join(roomId);
      rooms[roomId].users.push(user);
      const usernames = rooms[roomId].users.map(({ user }) => user);
      const queue = rooms[roomId].queue;
      socket.emit("roomJoined", {roomId, username, usernames, queue});
      io.in(roomId).emit("userUpdate", {usernames});
  });
  socket.on("disconnecting", () => {
    if (socket.rooms.size > 1) {
      console.log(`Socket ID ${socket.id} is disconnecting`);
      socket.rooms.forEach(function (roomId) {
        if(rooms[roomId]) {
          rooms[roomId].users = rooms[roomId].users.filter(user => user.id !== socket.id);
          usernames = rooms[roomId].users.map(({ user }) => user);
          if(usernames.length) { // check if room should exist, update if active, delete if inactive  
            io.in(roomId).emit("userUpdate", {usernames});
          } else {
            delete rooms[roomId];
          }
        }
      });
    }
    // rooms[socket.rooms[1]].users = rooms[socket.rooms[1]].users.filter(user => user.socketId !== socket.id);
    // socket.broadcast.to().emit("leftRoom", socket.rooms[1]);
  });

socket.on('roomState', (data) => {
  const usernames = rooms[data.roomId].users.map(({ user }) => user);
  const queue = rooms[data.roomId].queue;
  console.log("State requested.");
  socket.emit('userUpdate', {usernames});
  socket.emit('queueUpdate', {queue});
});

  socket.on("queueAdd", (data) => {
    rooms[data.roomId].queue.push(data.song)
    const queue = rooms[data.roomId].queue;
    io.in(data.roomId).emit('queueUpdate', {queue})
  });

  socket.on("queueRemove", async (data) => {
    rooms[data.roomId].queue.splice(data.index,1);
    const queue = rooms[data.roomId].queue;
    io.in(data.roomId).emit('queueUpdate', {queue})
  });

  socket.on("songPaused", (data) => {
    /* TODO: */
  });

  socket.on("songTime", (data) => {
    /* TODO: */
    const {roomId, time} = data;
    console.log(time);
    const type = 0;
    io.in(roomId).emit("songUpdate", {type, time})
  });

  socket.on("songState", (data) => {
    /* TODO: */
  });
});
server.listen(port, () => console.log(`Server running on port ${port}`));
