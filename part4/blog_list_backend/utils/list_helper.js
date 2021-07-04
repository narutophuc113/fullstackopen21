const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return sum
}

const favoriteBlog= (blogs)=>{
    if(blogs.length==0){
        return {}
    }
    const favorite= blogs.reduce((init, current)=>{
        if(init.likes < current.likes){
            return current
        }
        return init
    })
    const result={
        title:favorite.title,
        author:favorite.author,
        likes: favorite.likes
    }
    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}