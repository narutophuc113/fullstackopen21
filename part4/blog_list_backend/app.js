const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter=require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
if(process.env.NODE_ENV==='test'){
    const testingRouter=require('./controllers/testing')
    console.log('testing defined')
    app.use('/api/testing',testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
