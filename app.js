const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const trainerRoutes = require('./src/data-master/routes/trainer.routes')
const locationRoutes = require('./src/data-master/routes/location.routes')
const memberTypeRoutes = require('./src/data-master/routes/membership-type.routes')
const taxRoutes = require('./src/data-master/routes/tax.routes')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/trainer', trainerRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/tax', taxRoutes)
app.listen(port, () => console.log(`Server is listening on port ${port}`))

