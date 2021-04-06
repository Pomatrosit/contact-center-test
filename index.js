const express = require('express')
const onetwoRouter = require('./onetwo.routes')
const cors = require('cors')
const PORT = 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', onetwoRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
