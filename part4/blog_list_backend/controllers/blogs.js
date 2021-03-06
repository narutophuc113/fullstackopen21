const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    try {
        const user = request.user

        if (!body.title || !body.url) {
            response.status(400).send({error: 'title or url are missing'})
        } else {
            const blog = new Blog({
                title: body.title,
                author: body.author ? body.author : 'unknown',
                url: body.url,
                likes: body.likes ? body.likes : 0,
                user: user._id
            })

            const result = await blog.save()
            user.blogs = user.blogs.concat(result._id)
            await user.save()
            Blog.populate(result, {path: 'user', select: ['username', 'name']}, function (err, rs) {
                response.status(201).json(rs)
            })
        }
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const blog = {
        user: body.user,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {
            username: 1,
            name: 1
        })
        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    try {
        const user = request.user

        const blog = await Blog.findById({_id: request.params.id})
        if (blog) {
            if (blog.user.toString() === user.id.toString()) {
                await blog.remove()
                response.status(204).end()
            } else {
                return response.status(400).json({error: 'blog not belong to you'})
            }
        } else {
            response.status(204).end()
        }
    } catch (exception) {
        next(exception)
    }
})

//add comment for blog
blogsRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body
    try {
        if (!body.comment) {
            response.status(400).send({error: 'Comment is empty'})
        } else {
            const blog = await Blog.findById({_id: request.params.id})
            blog.comments = blog.comments.concat(body.comment.toString())
            await blog.save()
            Blog.populate(blog, {path: 'user', select: ['username', 'name']}, function (err, rs) {
                response.status(201).json(rs)
            })
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter