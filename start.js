const http = require("http");

const socket = require("./socket");
const app = require("./server");

const server = http.createServer(app);

socket(server); // initialize socketio

const port = process.env.PORT;
server.listen(port, () => console.log(`Listening on port: ${port}`));
