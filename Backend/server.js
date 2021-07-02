const express = require("express");
const path = require("path");

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

const app = express();

app.use(express.static("../frontend"));
app.use(express.json());

function initiateDatabase() {
    database.defaults({ passwords: [] }).write();
}

app.get("/*", (request, response) => {
    response.sendFile(path.resolve("../frontend", "index.html"));
});

app.post("/api/newPass", (request, response) => {
    const credentials = request.body;

    const newPass = database.get("passwords").push(credentials).write();

    if (newPass) response.json("Success");
    else response.json("Failure");
});

app.post("/api/:website", (request, response) => {
    const website = request.params.website;

    const findPass = database
        .get("passwords")
        .find({ website: website })
        .value();

    if (findPass) response.json(findPass.password);
    else response.json("Failure");
});

app.listen("8000", () => {
    console.log("Server started");
    initiateDatabase();
});
