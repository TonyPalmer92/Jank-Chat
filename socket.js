const { default: Axios } = require("axios");
const socketio = require("socket.io");
const axios = require("axios");

module.exports = (server) => {
  const io = socketio(server);

  // listens for new connections to the chat.ejs page
  io.on("connection", (socket) => {
    console.log(`User: ${socket.id} has connected`);

    // listening for any message sent from the individual connection
    socket.on("chat_message", (data) => {
      // call fn to make axios request
      makeRequest(data);

      // emits same message Object back to all users in the room
      // to be handle client-side
      io.emit("message", data);
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      //
      console.log(`User: ${socket.id} disconnected`);
    });
  });

  // make axios to same-server API
  function makeRequest(data) {
    axios.post("http://localhost:7000/api/message", data);
  }
};
