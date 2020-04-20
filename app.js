require('dotenv').config();
const express = require('express')
const app = express()
const port = 2000
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
// app.get('/', (req, res) => res.send('Hello World!'))
const Router = require('./src/routers/index')
app.use('/', Router )
app.use('/uploads', express.static('./uploads'))


app.listen(port, () => console.log(`${port} Tahun ku menunggumu`))