const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) {
        return {}
    }
    const favorite = blogs.reduce((init, current) => {
        if (init.likes < current.likes) {
            return current
        }
        return init
    })
    const result = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return result
}

const mostBlogs = blogs => {
    if (blogs.length == 0) {
        return {}
    }

    const countBlog = blogs.reduce((init, current) => {
        let index = _.findIndex(init, {author: current.author})
        if (index === -1) {
            init.push({
                author: current.author,
                blogs: 1
            })
        } else {
            init[index].blogs += 1
        }
        return init
    }, [])

    const result=_.maxBy(countBlog, 'blogs')
    return result
}

const mostLikes = blogs => {
    if (blogs.length == 0) {
        return {}
    }

    const countLike = blogs.reduce((init, current) => {
        let index = _.findIndex(init, {author: current.author})
        if (index === -1) {
            init.push({
                author: current.author,
                likes: current.likes
            })
        } else {
            init[index].likes += current.likes
        }
        return init
    }, [])

    const result=_.maxBy(countLike, 'likes')
    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}