const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000


const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/notes', (request, response) => {
  console.log(notes)
  response.json(notes)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})