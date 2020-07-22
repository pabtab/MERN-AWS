const express = require('express')
const authRoutes = require('./routes/auth')
const morgan = require('morgan') // To development see the routes
const bodyParser = require('body-parser') // To send body on req
const cors = require('cors') // For development because the diffetent ports to comunicate
const mongoose = require('mongoose') // Comunicate with mongo
require('dotenv').config() // For variables environments

const app = express()
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(cors())
app.use(cors({ origin: process.env.CLIENT_URL }))


// middlewares
app.use('/api', authRoutes)

app.listen(port, () => console.log(`Api is running on port ${port}`))