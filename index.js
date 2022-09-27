const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// socket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// socket Router
const socketRouter = require("./routes/SocketRouter")(io);

app.use("/api/v1", socketRouter);

app.set("view engine", "ejs");

app.set(express.urlencoded({ extended: false }));

app.set(express.json());

app.get("/", (_, res) => {
  res.send("hello world");
});

// socket connection
io.on("connection", (socket) => {
  console.log("socket id: ", socket.id);
});

server.listen(3001, () => {
  console.log("server is running");
});
