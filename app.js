const express = require('express')
const app = express()
const http = require('http');
const port = process.env.PORT || 8080

//ROUTE
const router = require('./src/routes/router')
//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', router)

http.createServer(app)
    .listen(port,() => console.log(`Server is listening on port ${port}`))


