const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path:'./config/config.env'})

const app= express()

const port = process.env.PORT || 3000

app.listen(
  PORT,
  console.log("Server runnning on ${PORT} in ${process.env.NODE_ENV} mode.")
)
