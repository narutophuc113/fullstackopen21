const bcrypt=require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs',{title:1, author:1, url:1, likes:1})
        response.json(users)
    } catch (exception) {
        next(exception)
    }
})

userRouter.post('/', async (request, response, next) => {
    const body = request.body

    if(body.password.length<3){
        response.status(400).json({error: 'password length at least 3 character'})
    }

    const saltRounds=10
    const passwordHash=await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })
    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = userRouter