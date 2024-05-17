const express = require('express');
require("../src/db/connect");

const Book = require("../src/models/Book")

const app = express();

app.use(express.json());


app.listen(3000, () => {
    console.log(`Server running at port 3000....`);
});


//CRUD OPERATION

//CREATE
app.post("/books", async (req, res) => {
    const book = new Book(req.body);
    try{
        await book.save();
        res.status(201).send(book);
    }catch(e){
        res.status(400).send(e);
    }
});

//READ ALL
app.get("/books", async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).send(books);
    }catch(e) {
        res.status(500).send();
    }
});

//READ ONE BY ID
app.get("/books/:id", async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send();
        }
        res.send(book);
    }catch(e) {
        res.status(500).send();
    }
});


//UPDATE
app.patch("/books/:id", async (req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!book) {
            return res.status(404).send();
        }
        res.send(book)
    }catch(e) {
        res.status(400).send(e);
    }
});


//DELETE
app.delete("/books/:id",async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send();
        }
        res.send(book);
    }catch(e) {
        res.status(500).send();
    }
});