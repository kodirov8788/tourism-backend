require('dotenv').config()
const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const loginRoutes = require('./routes/loginroute')
const clientRoutes = require('./routes/clientRouter')
const archivesRoutes = require('./routes/archives')

mongoose.set('strictQuery', false);
const app = express()

// middleware
app.use(express.json())
app.use(cors())


// routese
// app.use('/user', userRoutes)
// app.use('/auth', loginRoutes)
// app.use('/client', clientRoutes)
// app.use('/archives', archivesRoutes)

// connect to db


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })




