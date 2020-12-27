const socket = io();

const DOM = {
  chatForm: document.getElementById("chat_form"),
  chatMessages: document.getElementById("chat-messages"),
  roomName: document.getElementById("roomName"),
  userCount: document.getElementById("userCount"),
  userList: document.getElementById("userList"),
  fileUpload: document.getElementById("file-upload"),
};

// Get username and room from URL
const { username, room } = getURLinfo(window);

// Join Chat room
socket.emit("joinRoom", { username, room });

// Get room & user information
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("img-upload", (dataObj, baseString) => {
  outputMessage(dataObj, baseString);
  // Scroll down
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
});

function handleFile() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = function () {
    socket.emit("img-upload", reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

DOM.fileUpload.addEventListener("change", handleFile, false);

// Message submit event
DOM.chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get message text & desired theme
  const msg = e.target.elements.msg.value;
  const msg_theme = e.target.elements.colour.value;

  // Create message object to send to server
  const data = {
    msg,
    msg_theme,
  };

  // Emit message (data object) to server
  socket.emit("message_from_client", data);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Message from server
socket.on("message", (dataObj) => {
  outputMessage(dataObj);
  // Scroll down
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
});

// Output message to DOM
function outputMessage(dataObj, baseString) {
  const outDiv = document.createElement("div");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const p = document.createElement("p");

  outDiv.classList.add("message", dataObj.msg_theme);
  div.classList.add("message-body", "px-1", "mb-2");
  span.classList.add("has-text-grey");

  span.innerHTML = `<em><small>${dataObj.username} - ${dataObj.time}</small></em>`;

  div.appendChild(span);

  // if a base64 string was sent from server, create img element
  // else output the message
  if (baseString) {
    const imgdiv = document.createElement("div");
    const img = document.createElement("img");

    img.src = baseString;
    imgdiv.appendChild(img);
    div.appendChild(imgdiv);
  } else {
    p.innerText = `${dataObj.msg}`;
    div.appendChild(p);
  }

  outDiv.appendChild(div);
  DOM.chatMessages.appendChild(outDiv);
}

// Get username & room from URL
function getURLinfo(windowObj) {
  const queryString = windowObj.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Will return Null if .get() param does not exist in url
  const username = urlParams.get("username");
  const room = urlParams.get("room");

  return {
    username,
    room,
  };
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userCount.innerHTML = users.length;
  userList.innerHTML = "";

  users.forEach((user) => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("mb-1");
    span.innerHTML = `<em>${user.username}</em>`;
    div.appendChild(span);

    userList.appendChild(div);
  });
}
