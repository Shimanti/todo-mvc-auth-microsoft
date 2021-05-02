// modules that are needed
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

// database
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')

// routes
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

// retrieve the .env passwords from file
require('dotenv').config({path: 'config.env'})

// retrieve passport features from file
require('./config/passport')(passport)

// create database
connectDB()

// set and use modules in app
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// define session information which includes database for the app
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// use passport middleware to get Google oauth20 into app
app.use(passport.initialize())
app.use(passport.session())

// use routes defined above in app
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

// listen for result, if the app wworks
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})
