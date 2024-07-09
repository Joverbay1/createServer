const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
  if (request.url === "/create-directory") {
    fs.mkdir(path.join(__dirname, "content"), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("content folder created");
    });
  } else if (request.url === "/create-text") {
    fs.writeFile(
      path.join(__dirname, "randomText.txt"),
      "Some random text",
      (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("randomText.txt created");
      }
    );
  } else if (request.url === "/new-folder-and-file") {
    fs.readFile(path.join(__dirname, "randomText.txt"), "utf8", (err, data) => {
      if (err) {
        return console.error(err);
      }
      const contentDir = path.join(__dirname, "content");
      fs.writeFile(path.join(contentDir, "verbage.txt"), data, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("verbage.txt created");
        setTimeout(() => {
          fs.rm(contentDir, { recursive: true }, (err) => {
            if (err) {
              return console.error(err);
            }
            console.log("content folder deleted");
          });
        }, 7000);
      });
    });
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end("Node.js server is running\n");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
