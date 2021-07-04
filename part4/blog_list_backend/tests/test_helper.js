const Blog = require('../models/blog')
const User= require('../models/user')

const initialBlog = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user:'60deb30a3630832b44acc193'
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user:'60deb30a3630832b44acc193'
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user:'60deb30a3630832b44acc193'
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user:'60deb30a3630832b44acc193'
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs
}

const usersInDB = async ()=>{
    const users= await User.find({})
    return users
}

module.exports = {
    initialBlog, blogsInDB, usersInDB
}