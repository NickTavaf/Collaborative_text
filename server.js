import express from "express";
import http from "http";
import { Server } from "socket.io";

// Use the port Render provides, or default to 3000 for local dev
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Serve your docs folder (index.html, style.css, main.js) if you want Render to serve the frontend too
app.use(express.static("docs"));

io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  socket.on("draw", (data) => {
    // rebroadcast to everyone except the sender
    socket.broadcast.emit("draw", data);
  });

  socket.on("clear", () => {
    // rebroadcast to everyone except the sender
    socket.broadcast.emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
  
});



server.listen(3000, () => console.log("Server running on http://localhost:3000"));
