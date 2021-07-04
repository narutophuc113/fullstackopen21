const mongoose = require('mongoose')
const supertest = require('supertest')
const helper=require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog=require('../models/blog')

let token=''
beforeEach(async ()=>{
    await Blog.deleteMany({})
    const user={
        username: 'root',
        password: 'root'
    }
    const userLogin = await api.post('/api/login').send(user)
    token='Bearer '+userLogin.body.token
    const blogObject=helper.initialBlog.map(blog=>new Blog(blog))
    const promiseArray=blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)

    console.log('done beforeEach')
})

describe('get API test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-type', /application\/json/)
    })

    test('all blogs are returned', async ()=>{
        const response=await api
            .get('/api/blogs')
            .set('Authorization', token)
        expect(response.body).toHaveLength(helper.initialBlog.length)
    })

    test('check id property are returned', async ()=>{
        const response=await api.get('/api/blogs').set('Authorization', token)
        expect(response.body[0].id).toBeDefined()
    })
})

describe('post API test',()=>{
    test('post without JWT', async ()=>{
        const newBlog={
            title: "test new blog",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

    })
    test('a valid blog can be added', async ()=>{
        const newBlog={
            title: "test new blog",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd=await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length+1)

        const title=blogsAtEnd.map(blog=>blog.title)
        expect(title).toContain('test new blog')
    })

    test('blog without likes property will get 0', async ()=>{
        const newBlog={
            title: "test new blog without likes property",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newListBlogs=await helper.blogsInDB()
        const blogAtEnd=newListBlogs[helper.initialBlog.length] //count from 0
        expect(blogAtEnd.likes).toEqual(0);
    })

    test('blog without title and url will not add', async ()=>{
        const newBlog={
            title: "test new blog without likes property",
            author: "Robert C. Martin",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('update API test',()=>{
    test('update valid id return 201', async ()=>{
        const blogAtStart=await helper.blogsInDB()
        const blogToUpdate={
            id:blogAtStart[0].id,
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 100,
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', token)
            .send(blogToUpdate)
            .expect(201)

        const blogAtEnd=await helper.blogsInDB()
        expect(blogAtEnd).toHaveLength(helper.initialBlog.length)

        const blogIdUpdate=blogAtEnd[0]
        expect(blogIdUpdate.likes).toEqual(blogToUpdate.likes)
    })
})

describe('delete API test',()=>{
    test('delete succeed with code 204 when id is valid', async ()=>{
        const blogAtStart=await helper.blogsInDB()
        const blogToDelete=blogAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', token)
            .expect(204)

        const blogAtEnd=await helper.blogsInDB()
        expect(blogAtEnd).toHaveLength(helper.initialBlog.length-1)

        const blogIds=blogAtEnd.map(blog=>blog.id)
        expect(blogIds).not.toContain(blogToDelete.id)
    })
    test('delete return with code 204 when id is invalid', async ()=>{
        const blogToDeleteId=`aaaaa21wqasd`

        await api
            .delete(`/api/blogs/${blogToDeleteId}`)
            .set('Authorization', token)
            .expect(204)

        const blogAtEnd=await helper.blogsInDB()
        expect(blogAtEnd).toHaveLength(helper.initialBlog.length)
    })
})
afterAll(()=>{
    mongoose.connection.close()
})