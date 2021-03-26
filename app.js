const express = require('express')
const app = express()
const port = process.env.PORT || 8080

//ROUTE
const router = require('./src/routes/router')
//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', router)

app.listen(port, () => console.log(`Server is listening on port ${port}`))

