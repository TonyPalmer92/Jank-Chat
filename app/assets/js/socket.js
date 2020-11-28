const chatForm = document.getElementById("chat_form");
const chatMessages = document.getElementById("chat_messages");

const display_name = getUsername(window);
const room_name = getRoom(window);

const socket = io();

// Message from server
socket.on("message", (message) => {
  outputMessage(message);
});

// Message submit event
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Create message object
  const data = {
    room_name,
    display_name,
    msg,
  };

  // Emit message to server
  socket.emit("chat_message", data);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(data) {
  const p = document.createElement("p");
  p.innerHTML = `${data.display_name}: ${data.msg}`;
  chatMessages.appendChild(p);
}

// Get username from URL
function getUsername(windowObj) {
  const queryString = windowObj.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Will return Null if .get() param does not exist in url
  const display_name = urlParams.get("display_name");

  return display_name;
}

// Get roomName from URL
function getRoom(windowObj) {
  const queryString = windowObj.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Will return Null if .get() param does not exist in url
  const room_name = urlParams.get("room_name");

  return room_name;
}
