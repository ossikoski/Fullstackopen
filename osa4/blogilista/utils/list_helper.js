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
        authorName = blog.author
        if(authors.find(author => author.author === authorName) === undefined){
            var authorObject = new Author(authorName, 1)
        }else{
            var authorObject = authors.find(x => x.author === authorName)
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}