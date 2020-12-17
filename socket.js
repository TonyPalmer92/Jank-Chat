const socketio = require("socket.io");
const fs = require("fs");

const { formatMessage } = require("./lib/utils/message.js");
const {
  getRoomUsers,
  getCurrentUser,
  userLeave,
  userJoin,
} = require("./lib/utils/user");

module.exports = (server) => {
  const io = socketio(server);

  // listens for new connections to the chat.ejs page
  io.on("connection", (socket) => {
    console.log(`User: ${socket.id} has CONNECTED`);

    // User joins a room by default
    socket.on("joinRoom", ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // listening for any message sent from the individual connection
    // Listen for chatMessage
    socket.on("message_from_client", ({ msg, msg_theme }) => {
      const user = getCurrentUser(socket.id);

      // emit message back to specific room the user has joined
      io.to(user.room).emit(
        "message",
        formatMessage(user.username, msg, msg_theme)
      );
    });

    socket.on("img-upload", (image) => {
      const user = getCurrentUser(socket.id);

      const base64str = image;

      io.to(user.room).emit("img-upload", base64str);
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      console.log(`User: ${socket.id} DISCONNECTED`);
      const user = userLeave(socket.id);

      if (user) {
        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};
