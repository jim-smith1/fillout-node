require("dotenv").config();
const App = require("./api/app.js");
const http = require("http");

const PORT = process.env.PORT || 3000;
const appInstance = new App(); // Instantiate App
const server = http.createServer(appInstance.express); // Pass appInstance.express to createServer

server.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("HTTP server encountered an error", error);
  process.exit(1);
});
