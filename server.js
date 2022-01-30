const fs = require("fs");

// Import express (be sure its installed using npm)
const express = require('express');
const path = require('path');

// const api = require("./public/assets/js/index.js");
const uuid = require("uuid");

// Create an instance of the App object
const app = express();

// Create a variable to hold the port number for the express app
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
// app.use('/api', api);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// code goes here

// get saved notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// add new notes
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

// delete notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notes.filter((minusNote) => minusNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
});


// index.html route
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Gets the notes.html route
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
