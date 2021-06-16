const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("../frontend"));

app.get("/*", (request, response) => {
    response.sendFile(path.resolve("../frontend", "index.html"));
});

app.listen("8000", () => {
    console.log("Server started");
});
