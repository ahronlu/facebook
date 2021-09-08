import path from "path";
const express = require("express");
const app = express();
const sanitizeHTML = require("sanitize-html");
const jwt = require("jsonwebtoken");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./router"));

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  pingTimeout: 30000,
});

io.on("connection", function (socket) {
  socket.on("chatFromBrowser", function (data) {
    try {
      let user = jwt.verify(data.token, process.env.JWTSECRET);
      socket.broadcast.emit("chatFromServer", {
        message: sanitizeHTML(data.message, {
          allowedTags: [],
          allowedAttributes: {},
        }),
        username: user.username,
        avatar: user.avatar,
      });
    } catch (e) {
      console.log("Not a valid token for chat.");
    }
  });
});

module.exports = server;
