//seeder for populating the database with data
//for importing the data into the database and then deleting the data

const books = require('./data/books');
const connectDB = require('./db');
const Book = require('./models/bookModel');

connectDB();

const importData = async () => {
  //deleting the contents in the collections through the use of instance of the document
  try {
    await Book.deleteMany();
    const insertedBooks = await Book.insertMany(books);
    console.log(insertedBooks);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  await Book.deleteMany();
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
