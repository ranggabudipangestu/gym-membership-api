const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const trainerRoutes = require('./src/routes/trainer.routes')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/trainer', trainerRoutes)
app.listen(port, () => console.log(`Server is listening on port ${port}`))

