const express = require('express')
const authRoutes = require('./routes/auth')

const app = express()
const port = process.env.PORT || 8000;

// middlewares
app.use('/api', authRoutes)

app.listen(port, () => console.log(`Api is running on port ${port}`))