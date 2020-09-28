const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    for(let blog of blogs){
        likes += blog.likes
    }
    return likes
}

const favoriteBlog = (blogs) => {
    let favoriteLikes = 0
    let favorite = {}
    for(let blog of blogs){
        if(blog.likes > favoriteLikes){
            favorite = blog
            favoriteLikes = blog.likes
        }
    }
    favorite = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return favorite
}

const mostBlogs = (allBlogs) => {
    function Author(author, blogs){
        this.author = author
        this.blogs = blogs
    }
    const authors = []
    for(let blog of allBlogs){
        if(authors.find(author => author.author === blog.author) === undefined){
            var authorObject = new Author(blog.author, 1)
        }else{
            var authorObject = authors.find(x => x.author === blog.author)
            authorObject.blogs += 1
        }
        authors.push(authorObject)
    }
    let most = 0
    var mostAuthor = {}
    for(var authorObject of authors){
        if(authorObject.blogs > most){
            most = authorObject.blogs
            mostAuthor = {"author": authorObject.author, "blogs": authorObject.blogs}
        }
    }
    return mostAuthor
}

const mostLikes = (allBlogs) => {
    function Author(author, likes){
        this.author = author
        this.likes = likes
    }
    const authors = []
    for(let blog of allBlogs){
        if(authors.find(author => author.author === blog.author) === undefined){
            var authorObject = new Author(blog.author, blog.likes)
        }else{
            var authorObject = authors.find(x => x.author === blog.author)
            authorObject.likes += blog.likes
        }
        authors.push(authorObject)
    }
    let most = 0
    var mostAuthor = {}
    for(var authorObject of authors){
        if(authorObject.likes > most){
            most = authorObject.likes
            mostAuthor = {"author": authorObject.author, "likes": authorObject.likes}
        }
    }
    return mostAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}