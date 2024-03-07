require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Create an HTTP server instance
const httpServer = createServer(app);

// Initialize Socket.io server and pass the HTTP server instance
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];
// Event handler for when a new socket connection is established
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("joinRoom", (data) => {
    console.log("User joined room:", data);
    users.push(data);
    io.emit("userJoined", users); // Emit to all connected clients
  });

  socket.on("userDisconnect", (socket_Id) => {
    console.log(`User disconnected: ${socket_Id}`);
    const index = users.findIndex((user) => user.socketId === socket_Id);
    console.log(`This is Index : ${index}`);
    if (index !== -1) {
      // Remove the disconnected user from the active user list
      users.splice(index, 1);
      // Emit the updated active user list to all connected clients
      io.emit("userJoined", users);
    }
    // Log the updated list of active users
    console.log("Active users:", users);
  });
});

// Middleware for CORS and JSON parsing
app.use(express.json());
app.use(cors());

// Route for chat-related operations
const chat = require("./routes/route");
app.use("/chat", chat);

// Start listening on the specified port
httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
