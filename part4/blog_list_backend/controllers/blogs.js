const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
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
            response.status(201).json(result)
        }
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const user= request.user

        const blog = await Blog.findById({_id: request.params.id})
        if(blog){
            if(blog.user.toString() === user.id.toString()){
                await blog.remove()
                response.status(204).end()
            }else{
                return response.status(400).json({error: 'blog not belong to you'})
            }
        }else{
            response.status(204).end()
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter