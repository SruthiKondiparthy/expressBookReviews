const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let doesExist = require("./auth_users.js").doesExist;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,10))
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    console.log('isbn:',isbn);
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const allKeys = Object.keys(books);
    console.log('All keys:', allKeys);

    // 2. Iterate through the 'books' array & check the author
    const authorToFind = req.params.author; // Change this to the author you want to find
    const booksByAuthor = [];

    for (const key in books) {
        if (books[key].author === authorToFind) {
            booksByAuthor.push(books[key]);
        }
    }
    res.send(booksByAuthor)
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const allKeys = Object.keys(books);
    console.log('All keys:', allKeys);

    // 2. Iterate through the 'books' array & check the author
    const titleToFind = req.params.title; // Change this to the author you want to find
    const booksByTitle = [];

    for (const key in books) {
        if (books[key].title === titleToFind) {
            booksByTitle.push(books[key]);
        }
    }
    res.send(booksByTitle)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)  
});

module.exports.general = public_users;
