const typeDefs =`
  type Author {
    name: String!
    id: ID!
    born: Int
    books: [Book!]
    authorBookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
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
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
    findAuthor(name: String!): Author
    me: User
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
      authorBookCount: Int!
    ): Author
    
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      author: String!
      born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription {
    authorAdded: Author!
    bookAdded: Book!
  }`

module.exports = typeDefs