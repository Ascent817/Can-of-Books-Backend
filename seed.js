require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js');

mongoose.connect(process.env.DB_URL);

async function InitializeDatabase() {
    await Book.create({
        title: "Stuff ect.",
        description: "A book about stuff",
        status: "On hold"
    });

    await Book.create({
        title: "Stuff2 ect.",
        description: "A book2 about stuff",
        status: "On hold2"
    });

    await Book.create({
        title: "Stuff3 ect.",
        description: "A book3 about stuff",
        status: "On hold3"
    });
    
    mongoose.disconnect();
}

InitializeDatabase();