const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const Tokes = require('./models/Token')
const User = require('./models/User')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async (root) => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      } else if (args.author) {
        const resultAuthorSearch = await Author.findOne({ name: args.author })
        const booksOfAuthor = await Book.find({ author: resultAuthorSearch._id })
        return booksOfAuthor
      } else if (args.genre) {
        return Book.find({ genres: args.genre })
      }
      
    },
    allAuthors: async () => {
      return Author.find({}).populate('bookCount')
    },
    findBook: async (root, args) => 
      Book.findOne({ title: args.title }),
    findAuthor: async (root, args) =>
      Author.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: async (root, args) => {
      return Author.findOne({ _id: root.author })
    },
  },

  Author: {
    books: async (root) => {
      return await Book.find({ author: root._id })
    },
    authorBookCount: async (root) => {
        const result = await Book.find({ author: root._id })
        return result.length
    }
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args, authorBookCount: 0 })

      try {
        await author.save()
        // console.log(savedAuthor)
        // return savedAuthor
      } catch (error) {
        throw new GraphQLError('Saving a new Author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      pubsub.publish('AUTHOR_ADDED', { authorAdded: author })

      return author
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You have to log in to add a new book')
        return
      }
      let tempAuthor = await Author.findOne({ name: args.author} ).exec()
      if (!tempAuthor) {
        tempAuthor = await resolvers.Mutation.addAuthor({}, { name: args.author})
      }
      const book = new Book({ ...args, author: tempAuthor})

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving a new Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You have to log in to edit an author')
        return
      }
      const tempAuthor = await Author.findOne({ name: args.author})
      if (!tempAuthor) {
        return null
      }
      
      try {
        tempAuthor.born = args.born
        await tempAuthor.save()
      } catch (error) {
        throw new GraphQLError('Updating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.born,
            error
          }
        })
      }
      return tempAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: await jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },
  Subscription: {
    authorAdded: {
      subscribe: () => pubsub.asyncIterator('AUTHOR_ADDED')
    },
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers