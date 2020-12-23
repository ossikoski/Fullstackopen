const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const author = require('./models/author.js')
const { responsePathAsArray } = require('graphql')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

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
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
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
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({ author: root._id })
    } 
  },
  Mutation: {
    addBook: async (root, args) => {
      var author
      if( await Author.collection.countDocuments( {name: args.author }) === 0 ){
        console.log("No author found, creating new (countDocuments == 0)")
        const authorObject = {
          name: args.author
        }
        author = new Author(authorObject)
        author.save()
      }
      else{
        console.log("Finding old author, countDocuments:", await Author.collection.countDocuments( {name: args.author }))
        const authorResponse = await Author.find({name: args.author}).lean()
        console.log(authorResponse)
        author = authorResponse[0]._id
      }

      const book = new Book({
        title: args.title,
        author: author,
        published: args.published,
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
    editAuthor: async (root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})