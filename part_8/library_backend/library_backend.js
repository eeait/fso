const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const PASSWORD = process.argv[2];
const MONGODB_URI = `mongodb+srv://fullstack:${PASSWORD}@cluster0.qoq5d.mongodb.net/libraryApp?retryWrites=true&w=majority`;
console.log("Connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to DB!"))
  .catch((e) => {
    console.log("Error connecting to DB:", e.message);
  });

const JWT_SECRET = "FRODOBAGGINS";

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      // This is a mess, could be done better
      const authors = (await Author.find({})).map((a) => a.name);
      if (!authors.includes(args.author)) {
        const author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          });
        }
        var id = author._id.toString();
      } else {
        const author = await Author.findOne({ name: args.author });
        var id = author._id.toString();
      }
      const book = new Book({ ...args, author: id.toString() });
      try {
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        author.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((e) => {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      // Cred check
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrond creds");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Author: {
    bookCount: async ({ name, genre }) => {
      const authorIdWithName = (await Author.findOne({ name: name })).id;
      const all = await Book.find({});
      return all.filter((b) => b.author.toString() === authorIdWithName).length;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
