const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const author = require('./models/author.js')
const { responsePathAsArray } = require('graphql')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const MONGODB_URI = 'mongodb+srv://fullstack:jZTTEKf64sLtcZU@cluster0.zzinl.mongodb.net/library?retryWrites=true&w=majority'

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
    allBooks: (root, args) => {
      console.log("allBooks resolver")
      /*
      if(!args.author && !args.genre){
        return books
      }
      if(!args.author && args.genre){
        return books.filter(b => b.genres.includes(args.genre))
      }
      if(args.author && !args.genre){
        return books.filter(b => b.author === args.author)
      }
      */
      return Book.find({})
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
    editAuthor: (root, args) => {
      if(!authors.some(a => a.name === args.name)){
        return null
      }
      authors.map(a =>{
        if(a.name === args.name){
          a.born = args.setBornTo
        }
      })
      return authors.find(a => args.name === a.name)
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