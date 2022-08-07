const { UserInputError, AuthenticationError } = require("apollo-server-core");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const JWT_SECRET = "FRODOBAGGINS";

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const searchParameter = args.genre == null ? {} : { genres: args.genre };
      const books = await Book.find(searchParameter);
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

      pubsub.publish("BOOK_ADDED", { bookAdded: book });
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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
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

module.exports = resolvers;
