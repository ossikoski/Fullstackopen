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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}