const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const User = require('./models/user.js')
const { responsePathAsArray } = require('graphql')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

const jwt = require('jsonwebtoken')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
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
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
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
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log("allBooks resolver")
      if(!args.author && !args.genre){
        return Book.find({})
      }
      if(!args.author && args.genre){
        return Book.find({genres: { $in: args.genre }})
      }
      if(args.author && !args.genre){
        console.log("Author argument: doesn't work (8.14)")
        return Book.find({ author: args.author })
      }
      console.log("Both arguments: doesn't work (8.14)")
      const bookResponse = await Book.find({ author: args.author }).lean()
      const books = bookResponse.filter(b => b.genres.includes(args.genre))
      console.log("bookResponse", bookResponse)
      console.log("books", books)
      return books
    },
    allAuthors: () => {
      console.log('allAuthors resolver')
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({ author: root._id })
    } 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      await console.log('addBook mutation before context')
      const currentUser = context.currentUser
      console.log('addBook mutation current user', currentUser)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      var author
      if( await Author.collection.countDocuments( {name: args.author }) === 0 ){
        console.log("No author found, creating new (countDocuments == 0)")
        const authorObject = {
          name: args.author
        }
        author = new Author(authorObject)
        try{
          await author.save()
        }
        catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      else{
        console.log("Finding old author, countDocuments:", await Author.collection.countDocuments( {name: args.author }))
        const authorResponse = await Author.find({name: args.author}).lean()
        console.log(authorResponse)
        author = authorResponse[0]._id
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      })
      
      try{
        await book.save()
      }
      catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const authors = await Author.find({}).lean()
      console.log(authors)
      if(!authors.some(a => a.name === args.name)){
        console.log("Given author doesn't exist")
        return null
      }
      const author = authors.find(a => a.name === args.name)
      const authorId = author._id
      const editedAuthor = {
        id: author._id,
        name: author.name,
        born: args.setBornTo
      }
      const authorResponse = await Author.findByIdAndUpdate(authorId, editedAuthor)
      return authorResponse
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      console.log('login resolver')
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})