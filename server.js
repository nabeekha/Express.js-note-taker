const express = require('express')
const path = require('path')
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes')

const PORT = 3001

const app = express()

//creating middleware for parsing json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
app.use(express.static('public'))

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)