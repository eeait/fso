const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const { v1: uuid } = require("uuid");

const password = process.argv[2];
const MONGODB_URI = `mongodb+srv://fullstack:${password}@cluster0.qoq5d.mongodb.net/libraryApp?retryWrites=true&w=majority`;
console.log("Connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to DB!"))
  .catch((e) => {
    console.log("Error connecting to DB:", e.message);
  });

let authors = [];

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args.genre);
      const books = await Book.find({ genres: args.genre });
      return books;
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      // This is a mess, could be done better
      const authors = (await Author.find({})).map((a) => a.name);
      if (!authors.includes(args.author)) {
        const author = new Author({ name: args.author });
        const savedAuthor = await author.save();
        var id = savedAuthor._id.toString();
      } else {
        const author = await Author.findOne({ name: args.author });
        var id = author._id.toString();
      }
      const proposed = { ...args, author: id.toString() };
      console.log("Proposed:", proposed);
      const book = new Book(proposed);
      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },
  },

  Author: {
    bookCount: ({ name, genre }) => {
      return books.filter((b) => b.author === name).length;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
