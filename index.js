const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

let persons = [
  {
    id: 1,
    name: "Jhon Doe",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Lovelace Ada",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Abrahim",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.filter((notes) => notes.id === id);
  console.log(note);
  res.json(note);
});

const genereateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Content is required",
    });
  }

  const note = {
    content: body.content,
    importance: body.importance || false,
    id: genereateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.send("Delete notes");
});

const PORT = 3005;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const requestTime = new Date();
  const personsLength = persons.length;
  res.send(
    `Phonebook has info for ${personsLength} people <br> ${requestTime}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((person) => person.id === id);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.send(`${persons[id].name} with an id ${id} has been deleted successfully`);
});
